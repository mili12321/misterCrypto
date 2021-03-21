import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/services/contact.service';
// import {Directive, HostListener} from "@angular/core";

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss']
})

// @Directive({
//   selector: "[click-stop-propagation]"
// })

export class ContactPreviewComponent implements OnInit {

  // @HostListener("click", ["$event"])
  // public onClick(event: any): void{
  //   event.stopPropagation();
  // }

  constructor( private contactService: ContactService) { }
  @Input() contact: Contact;
  @Input() idx: number;
  @Input() onRemoveContact: (args: any) => void;
  @Input() onToggleFav: (args: any) => void;
  
  faInfoCircle=faInfoCircle;
  faUserTimes=faUserTimes;
  faStar=faStar

  img: string;

  ngOnInit(): void {
    this.img = `/assets/img/avatars/${this.contact.img}.png`
  }

  test(){
    console.log("link clicked")
  }



}
