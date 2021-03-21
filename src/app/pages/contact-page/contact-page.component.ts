import { Component, OnInit ,OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit, OnDestroy {

  constructor(
    private contactService: ContactService,
    private router: Router) {}


    filterBy = {
      name: '',
      phone: '',
      category: '',
      isFavorite: false
    };

  faStar=faStar;
  faUserFriends=faUserFriends;
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;

  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  favContacts: Contact[] = [];

  category: string = '';
  phone: string = '';
  name: string = '';
  isFavoriteFilter: boolean = false;

  fav: number = null;
  work: number = null;
  family: number = null;
  friend: number = null;
  other: number = null;

  activeBtn: string = 'btn5';

  subscription: Subscription;
  contact: Contact = null;

  partOfFavoriteContacts: Contact[] = [];

  imageUrl: string = "/assets/img/avatars/";
  imageFormat: string = ".png";

  ngOnInit(): void {
    this.loadContacts()
  }



  loadContacts(){
    this.contactService.loadAllContacts()
    this.subscription = this.contactService.allContacts$.subscribe(contacts =>{
      this.filteredContacts = contacts
    })
    this.contactService.loadContacts()
    this.subscription = this.contactService.contacts$.subscribe(contacts =>{
      this.contacts = contacts
      this.favContacts=this.filteredContacts.filter(contact=>contact.isFavorite===true)
      this.partOfFavoriteContacts =this.favContacts.slice(0,3) 
      this.fav = this.filteredContacts.filter(contact=>contact.isFavorite===true).length 
      this.work = this.filteredContacts.filter(contact=>contact.category==='co-worker').length
      this.family = this.filteredContacts.filter(contact=>contact.category==='family').length
      this.friend = this.filteredContacts.filter(contact=>contact.category==='friend').length
      this.other = this.filteredContacts.filter(contact=>contact.category==='other').length
    })
    this.subscription = this.contactService.isFavorite$.subscribe(fav =>{
      this.isFavoriteFilter = fav
    })
  }

  onFavContacts(btnNum:string){
    this.filterBy.isFavorite = true
    this.isFavoriteFilter = this.filterBy.isFavorite
    this.contactService.checkFavorite(this.filterBy.isFavorite )
    this.filterBy.name = this.name
    this.filterBy.phone = this.phone
    this.filterBy.category = ''
    this.contactService.loadContacts(this.filterBy)
    this.activeBtn = btnNum
  }
  onCategoryContacts(category: string, btnNum: string){
    this.filterBy.isFavorite = false
    this.isFavoriteFilter = this.filterBy.isFavorite
    this.contactService.checkFavorite(this.filterBy.isFavorite )
    if(category===''){
      this.filterBy.name = this.name
      this.filterBy.phone = this.phone
      this.category = category
      this.filterBy.category = this.category
      this.contactService.loadContacts(this.filterBy)
      this.activeBtn = btnNum
    }else{
      this.filterBy.name = this.name
      this.filterBy.phone = this.phone
      this.category = category
      this.filterBy.category = this.category
      this.contactService.loadContacts(this.filterBy)
      this.activeBtn = btnNum
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  onFilterHandler(filterBy) {
    this.name = filterBy.name
    this.phone = filterBy.phone
    this.contactService.loadContacts(filterBy)
    console.log("this.filterBy",this.filterBy)
  }

  onAddContact(){
    this.router.navigate([this.router.url === '/edit' ? '' : 'edit'])
  }

  onSaveContact() {
    this.contactService.save(this.contact)
    this.contact= null
  }
  onRemoveContact = (contactId: any) => {
    this.contactService.remove(contactId,this.filterBy)
    return false
  }

  onToggleFav = (contact: Contact) => {
    contact.isFavorite = !contact.isFavorite;
    this.contactService.save(contact,this.filterBy);
    return false
  }


}
