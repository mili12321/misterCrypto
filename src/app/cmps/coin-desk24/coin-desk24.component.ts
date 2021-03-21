import { Component, Input, OnInit } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'coin-desk24',
  templateUrl: './coin-desk24.component.html',
  styleUrls: ['./coin-desk24.component.scss']
})
export class CoinDesk24Component implements OnInit {

  constructor( ) { }

  faArrowUp=faArrowUp
  faArrowDown=faArrowDown
  
  @Input() selectedCoin;
  // LOW24HOUR: 
  // HIGH24HOUR: 
  // CHANGE24HOUR:
  // OPEN24HOUR:
  
  // CHANGEPCT24HOUR: 
  ngOnInit(): void {

  }


}
