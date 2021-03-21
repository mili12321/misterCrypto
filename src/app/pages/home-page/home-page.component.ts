import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model'; 
import { Move } from 'src/app/models/move.model'; 
import { News } from 'src/app/models/news.model' 
import { ActivatedRoute } from "@angular/router"; 
import { AuthService } from "src/app/services/auth.service"; 
import { first } from 'rxjs/operators';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private bitcoinService: BitcoinService,
    private route: ActivatedRoute  
    ) { 
      this.currentUser = this.authService.currentUserValue;
      this.userService.getUsers().subscribe(users => {
        this.users = users
        this.users = this.users.filter(user=> user.name === this.currentUser.name)
        this.user = this.users[0]
        this.userService.getUser(this.user)
        this.last3Moves = this.user.moves.slice(0,3);
      })
    }
    currentUser: User;
    user: User = null
    users: User[] = []
    move: Move 
    last3Moves: Move[]

    bitcoinRate: number = null
    subscription: Subscription

    thisBitInfo:any

  //bitcoin-desk
      selectedCoin = {};  
      coinInfo = {}    
      coinData      
      bitData = {
        img:'',
        name: "Bitcoin",
        symbol:"BTC", 
        coinInfo:[]//EUR,ILS,USD
      }     
      resultArray=[]
      coinInfoArray = []      
  //-------------

  message 

  dailyPair
  dailyNews:News

  faTimesCircle=faTimesCircle
  imgs: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
  isModalOpen: boolean = false;
  imageUrl: string = "/assets/img/avatars/"
  imageFormat: string = ".png"
  getImgNum(num:number){
    this.user.img = num
    this.userService.getUser(this.user)
  }

  toggleModal(){
    this.isModalOpen=!this.isModalOpen
  }
  
  users123: User[]

  ngOnInit(): void {
    this.dailyPair = this.route.snapshot.data.dailyPair
    this.dailyNews = this.route.snapshot.data.dailyNews.Data
    this.getRate()
    this.getDefaultData()
    this.userService.getUsers()
    .subscribe(users=>{
      this.users = users
    })
    this.loadAllUsers()
  }

  private loadAllUsers() {
    this.userService.getAll()
        .pipe(first())
        .subscribe(users => this.users123 = users);
  } 
  deleteUser(id) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => this.loadAllUsers());
  }

  

  getNewCoin(newCryptoCoin) {
    this.coinInfo = newCryptoCoin
    this.getCoinData()
  }


  getNewSelectedCoin(coin: string) {
    this.selectedCoin=coin
  }

  getNewCryptoCurrCoin() {
    this.bitcoinService.cuurCryptoCoin.subscribe(coin=>this.coinInfo = coin)
    this.getCoinData()
  }



  getRate(){
    this.bitcoinService.getRate(1).subscribe((rate: number)=>{
      this.bitcoinRate = rate;
    
    })  
  }

  getFirstName(){
    for (var i=0;i<this.user.name.length;i++)
    {
      var firstName = this.user.name.split(" ");
      return firstName[0].toLocaleLowerCase()
    }
  }


  getDefaultData(){//bitcoin-desk
    this.bitcoinService.getPrices().subscribe(result=>{
      this.coinData = result
      this.coinData = this.coinData.DISPLAY
      // console.log('this.coinData',this.coinData)
      this.bitData.coinInfo = this.coinData.BTC
      this.coinInfo = this.bitData
      this.bitcoinService.getCryptoCoin(this.bitData)
      this.bitcoinService.cuurCryptoCoin.subscribe(coin=>this.coinInfo = coin)
      // console.log('this coin info after change:',this.coinInfo )
      this.getCoinData()
    })
  }

 
  getCoinData(){//CryptoCurrCoin-desk
    this.resultArray=Object.keys(this.coinInfo).map((idx)=>{
      let item = this.coinInfo[idx];
      return item;
    });
    this.coinInfoArray = Object.keys(this.resultArray[3]).map((idx)=>{
      let item = this.resultArray[3][idx];
      return item;
    });
    this.coinInfoArray[0].NAME = 'USD'
    this.coinInfoArray[1].NAME = 'EUR'
    this.coinInfoArray[2].NAME = 'ILS'
    this.selectedCoin = this.coinInfoArray[0]
  }

}










