import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'coin-type-balance-preview',
  templateUrl: './coin-type-balance-preview.component.html',
  styleUrls: ['./coin-type-balance-preview.component.scss']
})
export class CoinTypeBalancePreviewComponent implements OnInit {

  @Input() coin:any

  isIncrease: boolean
  faArrowUp=faArrowUp
  faArrowDown=faArrowDown


  message

  constructor(private bitcoinService: BitcoinService) { }

  ngOnInit(): void {}

  changeArrow(){
      if(this.coin.coinData.USD.CHANGEPCTDAY.charAt(0)==="-"){
  
        this.isIncrease = false;
      }else{

        this.isIncrease = true;
      }

  }
  changeColor(){
      if(this.isIncrease){
          return "green"
      }else{
        return "red"
      }
  }
  sendCoin(){
    this.bitcoinService.getCryptoCoin(this.coin)
    this.bitcoinService.updateMessage(this.coin)
  }

  
  

}
