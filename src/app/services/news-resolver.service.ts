import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { BitcoinService } from 'src/app/services/bitcoin.service' 
import { News } from 'src/app/models/news.model' 

@Injectable({
  providedIn: 'root'
})
export class NewsResolverService implements Resolve<Observable<News>> {

  constructor( private bitcoinService: BitcoinService ) { }

  resolve(route: ActivatedRouteSnapshot):Observable<News> { 
    return this.bitcoinService.getNews();  
  } 
}
