import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Location } from '@angular/common';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
 
  constructor(
    private contactService: ContactService,
    private location: Location,
    private fb: FormBuilder
    ) { }
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    isFavorite: false,
    category: '',
    img: Math.floor(Math.random() * 32) + 1
  } 



faHandPointLeft=faHandPointLeft;
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
// phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

toggleModal(){
  this.isModalOpen=!this.isModalOpen
}
getImgNum(num:number){
  this.contact.img = num
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

onBack(){
  this.location.back()
}
  ngOnInit(): void {
    this.setForm()
  }

  onSaveContact() {
    var data = this.contactForm.value
    data = {...data, img: this.contact.img};
    this.contactService.save(data)
    this.contact = {
      name: '',
      email: '',
      phone: '',
      isFavorite: false,
      category: '',
      img: Math.floor(Math.random() * 32) + 1
    } 
    this.onBack()
  }
}
