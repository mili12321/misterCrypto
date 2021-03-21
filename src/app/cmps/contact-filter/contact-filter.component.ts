import { Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit,OnDestroy {
  @Input() category: string;
  @Output() onFilter = new EventEmitter();
  
  subscription: Subscription
  isFavoriteFilter: boolean;
  filterBy = {
    name: '',
    phone: '',
    category: '',
    isFavorite: false
  }
  faSearch=faSearch
  constructor( private contactService: ContactService ) { }

  ngOnInit(): void {
    this.subscription = this.contactService.isFavorite$.subscribe(fav =>{
      this.isFavoriteFilter = fav
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  filter(){
    if(this.isFavoriteFilter){
      this.filterBy.category = ''
      this.filterBy.isFavorite = this.isFavoriteFilter
    }else{
      this.filterBy.isFavorite = this.isFavoriteFilter
      this.filterBy.category = this.category
    }
    this.onFilter.emit(this.filterBy);
  }

  clearFilter(){
    this.filterBy.name = ''
    this.filterBy.phone = ''
    this.filter()
  }

}
