import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit,OnDestroy {


  contactId: string;
  private sub: any;
  contact: Contact;
  subscription: Subscription;

  faHandPointLeft=faHandPointLeft;
  faEdit=faEdit;
  faTimesCircle=faTimesCircle;

  imageUrl: string = "/assets/img/avatars/";
  imageFormat: string = ".png";
  
categores = [
  {name: 'co-worker', abbrev: 'co-worker'},
  {name: 'family', abbrev: 'family'},
  {name: 'friend', abbrev: 'friend'},
  {name: 'other', abbrev: 'other'},
];

  imgs: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
  isModalOpen: boolean = false;

  contactForm: FormGroup;
  phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

  constructor(
    private route: ActivatedRoute, 
     private contactService: ContactService, 
     private location: Location,
     private fb: FormBuilder, 
     private router: Router
  ) { 
  }
  // @Input() contact: Contact


  getImgNum(num:number){
    this.contact.img = num
  }

  toggleModal(){
    this.isModalOpen=!this.isModalOpen
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.contactId = params.id;
    });
    if(this.contactId){
      // console.log(' params.contactId', params.id)
      this.contactService.getContactById(this.contactId)
      .subscribe((contact: Contact)=>{
        this.contact = contact;
        this.setForm(); 
        console.log("this.contactForm.controls",this.contactForm.controls)
      })   
    }else{
      this.contact.img = Math.floor(Math.random() * 32) + 1
      this.contact.isFavorite = false
      this.contact.category = ''
      this.setForm(); 
    }

  }
  get f() { return this.contactForm.controls; }

  setForm(){
    this.contactForm = this.fb.group({
      name: [this.contact.name, [Validators.required, Validators.maxLength(15)]],
      // phone: [this.contact.phone, [Validators.required, Validators.pattern(this.phoneRegex)]],
      phone: [this.contact.phone, [Validators.required]],
      email: [this.contact.email, [Validators.required, Validators.email]],
      isFavorite: [this.contact.isFavorite],
      category: [this.contact.category]
    })
  }
 
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onBack(){
    this.location.back()
  }

  onSaveContact() {
    var data = this.contactForm.value
    if (this.contact._id){
      data = {...data, _id: this.contact._id, img: this.contact.img};
    }else{
      data = {...data, img: this.contact.img};
    }
    this.contactService.save(data)
    this.onBack()
  }

 

}
