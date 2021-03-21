import { Component, OnInit, Input  } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin.service'

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {

  constructor( private bitcoinService: BitcoinService ) { }

  @Input() dailyPair

  fromCoins=['BTC','ETH','XRP','LTC']
  toCoins=['USD','EUR','ILS']
  selectedFromCoin='BTC'
  selectedToCoin='USD'
  selectedDays = 50;

  // dailyPair

  public primaryXAxis: Object;
  public title: string;
  public primaryYAxis: Object;
  public data: Object[] = []

  public border: Object;
  public chartArea: Object;

  public crosshair: Object = {
    enable: true
  };

  public enableSolidCandles: Object = { enable: true };

  ngOnInit(): void {
    console.log("dailyPair",this.dailyPair)

    this.getChartData()
    // this.getDailyPair()
    this.primaryXAxis = {
        title: 'Date',
        valueType: 'Category',
        majorGridLines: { color: 'transparent' },
        crosshairTooltip: { enable: true } 
        };
    
    this.primaryYAxis = {
        title: 'Price in Dollar', minimum: 30, maximum:70, interval: 5,
        labelFormat: '${value}K',
        lineStyle: { color: 'transparent' },
        majorTickLines: { color: 'transparent', width: 0 },
        };
    this.title = 'Financial Analysis';
    this.border = { width: 2, color: 'transparent'};
    this.chartArea = { background: 'transparent'};
  }

  getChartData(){
    this.dailyPair=this.dailyPair.Data.Data
    this.dailyPair=this.dailyPair.forEach(element => 
      this.data.push(
        {
          time:new Date(element.time*1000).toLocaleDateString("en-US"),
          low:element.low/1000,
          high:element.high/1000,
          open:element.open/1000,
          close:element.close/1000,
        }
      ))
  }


  getDailyPair(){
    this.bitcoinService.getDailyPair(this.selectedFromCoin,this.selectedToCoin,this.selectedDays).subscribe(result=>{
      this.dailyPair= result
      this.dailyPair=this.dailyPair.Data.Data
      console.log("selectedFromCoin",this.selectedFromCoin)
      console.log("selectedToCoin",this.selectedToCoin)
      console.log("selectedDays",this.selectedDays)
      console.log("dailyPair",this.dailyPair)
      this.dailyPair=this.dailyPair.forEach(element => 
        this.data.push(
          {
            time:new Date(element.time*1000).toLocaleDateString("en-US"),
            low:element.low/1000,
            high:element.high/1000,
            open:element.open/1000,
            close:element.close/1000,
          }
        ))
    })
  }

  getData(){
    this.getDailyPair()
    this.primaryXAxis = {
      title: 'Date',
      valueType: 'Category',
      majorGridLines: { color: 'transparent' },
      crosshairTooltip: { enable: true } 
      };
  
    this.primaryYAxis = {
      title: 'Price in Dollar', minimum: 30, maximum: 70, interval: 5,
      labelFormat: '${value}K',
      lineStyle: { color: 'transparent' },
      majorTickLines: { color: 'transparent', width: 0 },
    };
    this.title = 'Financial Analysis';
    this.border = { width: 2, color: 'transparent'};
    this.chartArea = { background: 'transparent'};
  }

}

