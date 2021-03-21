import { Component, OnInit,OnDestroy, Output, EventEmitter } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'coin-type-balance',
  templateUrl: './coin-type-balance.component.html',
  styleUrls: ['./coin-type-balance.component.scss']
})
export class CoinTypeBalanceComponent implements OnInit, OnDestroy {

  constructor(private bitcoinService: BitcoinService) {}

  id: any;

  thisBitInfo:any
  coinsInfo:any
  btcCoin = {
    // img:"https://img.icons8.com/office/25/000000/bitcoin.png",
    img:"/assets/img/bit.png",
    // img:"/assets/img/bitcoin.png",
    name:"Bitcoin",
    symbol:"BTC",
    coinData:[]
  }
  ethCoin = {
    img:"/assets/img/eth.png",
    // img:"/assets/img/ethereum.png",
    name:"Ethereum",
    symbol:"ETH",
    coinData:[]
  }
  xrpCoin = {
    img:"/assets/img/rip.png",
    // img:"/assets/img/ripple.png",
    name:"Ripple",
    symbol:"XRP",
    coinData:[]
  }
  ltcCoin = {
    img:"/assets/img/lit.png",
    // img:"/assets/img/litecoin.png",
    name:"Litecoin",
    symbol:"LTC",
    coinData:[]
  }

  @Output() newCryptoCoinInfo = new EventEmitter<string>();

  coin
  sendCoin(coin) {
    this.newCryptoCoinInfo.emit(coin);
  }


  ngOnInit(): void {

  this.getPriceInfo()
  this.id = setInterval(() => {
    this.getPriceInfo();
  }, 1000*60);

  }

  getPriceInfo(){
    this.bitcoinService.getPrices().subscribe(result => {
      this.coinsInfo = result
   
      this.coinsInfo = this.coinsInfo.DISPLAY
      this.btcCoin.coinData = this.coinsInfo.BTC
      this.ethCoin.coinData = this.coinsInfo.ETH
      this.xrpCoin.coinData = this.coinsInfo.XRP
      this.ltcCoin.coinData = this.coinsInfo.LTC
    })  
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  

}
