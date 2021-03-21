import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model'; 
import { Move } from 'src/app/models/move.model'; 
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/services/auth.service"; 


@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss']
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy  {

  constructor( private route: ActivatedRoute, 
     private contactService: ContactService, 
     private location: Location,
     private userService: UserService,
     private authService: AuthService,     ) {
      this.currentUser = this.authService.currentUserValue;
      this.userService.getUsers().subscribe(users => {
        this.users = users
        this.users = this.users.filter(user=> user.name === this.currentUser.name)
        this.user = this.users[0]
        this.userService.getUser(this.user)
      })
    }
  currentUser: User;
  userSubscription: Subscription;
  user: User = null;
  users: User[] = [];
  move: Move ;
  amount: number;

  imageUrl: string = "/assets/img/avatars/";
  imageFormat: string = ".png";

  currContactMoves: Move[];

  contactId: string;
  private sub: any;
  contact: Contact ;
  subscription: Subscription;

  faUserEdit=faUserEdit;
  faHandPointLeft=faHandPointLeft;
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.contactId = params.contactId;
      this.contactService.getContactById(this.contactId)
      .subscribe((contact: Contact)=>{
        this.contact = contact;
      })   
   });
   this.userSubscription = this.userService.user$.subscribe(user => {
    this.user = user
    if (user){
      this.currContactMoves = this.user.moves.filter(move => move.toId === this.contactId )
    }
  })}


  addAmount(amount:number){
    this.amount = amount
    this.userService.addMove(this.contact,amount)
    .subscribe((user: User)=> {
      this.user = user
      this.currContactMoves = this.user.moves.filter(move=> move.toId === this.contact._id )
    })
   
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onBack(){
    this.location.back()
  }
}
