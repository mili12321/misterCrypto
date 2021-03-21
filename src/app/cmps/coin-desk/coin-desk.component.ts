import { Component, Input, OnInit, } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { BitcoinService } from '../../services/bitcoin.service';

@Component({
  selector: 'coin-desk',
  templateUrl: './coin-desk.component.html',
  styleUrls: ['./coin-desk.component.scss']
})



export class CoinDeskComponent implements OnInit {

  constructor( private bitcoinService: BitcoinService,) { }

  @Input() coinInfo;
  @Input() selectedCoin;
  @Input() coinInfoArray;
  @Output() messageToEmit = new EventEmitter<string>();
  
  faArrowUp=faArrowUp;
  faArrowDown=faArrowDown;

  ngOnInit(): void {
    this.bitcoinService.cuurCryptoCoin.subscribe(coin=>this.coinInfo = coin)
  }

  onChange(newCoinValue) {
    this.messageToEmit.emit(newCoinValue)
  }

}
