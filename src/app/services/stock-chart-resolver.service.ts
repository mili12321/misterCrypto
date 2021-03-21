import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { BitcoinService } from 'src/app/services/bitcoin.service' 
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockChartResolverService implements Resolve<Observable<any>>{

  constructor( private bitcoinService: BitcoinService ) { }

  dailyPair = {
    from: "BTC",
    to: "USD",
    days: "50"
  }
  resolve(route: ActivatedRouteSnapshot):Observable<any> { 
    this.bitcoinService.dailyPair$.subscribe(d=>{
      console.log("d=",d)
      if(d){
        this.dailyPair = d
      }else{
        return
      }
    })
    console.log("dailyPair form ActivatedRouteSnapshot",this.dailyPair )
    // const from = "BTC"; 
    // const to = "USD"; 
    // const days = "2"; 
    return this.bitcoinService.getDailyPair(this.dailyPair.from,this.dailyPair.to,this.dailyPair.days);  
  } 
}
