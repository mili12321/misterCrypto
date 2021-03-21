import { Component, OnInit,Input,Output, EventEmitter  } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'transfer-fund',
  templateUrl: './transfer-fund.component.html',
  styleUrls: ['./transfer-fund.component.scss']
})
export class TransferFundComponent implements OnInit {

  constructor(private userService: UserService) { }

  @Output() newItemEvent = new EventEmitter<number>();

  userSubscription: Subscription;

  amount: number = null;
  message: string = '';
  messageType: string = '';
  symbol: string = '';
  user: User = null;

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe(user => {
      this.user = user})
  }

  addNewItem(value: number) {
    if(value<=0){
      this.message= "Enter a valid amount to transfer"
      this.messageType = "Not Valid"
      this.symbol = "1"
        setTimeout(()=>{                          
          this.message = '';
        }, 2000); 
      this.amount=null 
    }else if(value<this.user.coins){
      this.newItemEvent.emit(value);
      this.amount=null
      this.message= "Transfered"
      this.messageType = "Success"
      this.symbol = "2"
        setTimeout(()=>{                          
          this.message = '';
        }, 2000);  
    }else{
      this.message= "You don't have enough money!"
      this.messageType = "Error"
      this.symbol = "3"
        setTimeout(()=>{                          
          this.message = '';
        },2000);
        this.amount=null  
    }
  }

  getBeforeStyle():string{
    if(this.symbol === "1"){
      return "#deb796";
    } else if(this.symbol === "2") {
      return "#a2de96";
    }else{
      return "#de96a2";
    }
  }
  getIconStyle():string{
    if(this.symbol === "1"){
      return "#d7580f";
    } else if(this.symbol === "2") {
      return "#79d70f";
    }else{
      return "#d70f5c";
    }
  }


}
