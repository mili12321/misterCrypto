import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import {CryptoCoin} from 'src/app/models/crypto.model'
import { Observable } from "rxjs"; 
import { News } from 'src/app/models/news.model' 

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {



  
/////////////////////////////////////////////////
  API_KEY = 'ADD YOUR API KEY HERE'
////////////////////////////////////////////////




  result:any;

  bitData ={
    name: "Bitcoin",
    symbol:"BTC",
    coinInfo:[] ,
  }

  private _dailyPair$ = new BehaviorSubject<any>(null);
  public dailyPair$ = this._dailyPair$.asObservable()

  // private cryptoCoin= new BehaviorSubject<string>('cryptoCoin');
  private cryptoCoin= new BehaviorSubject<CryptoCoin>(this.bitData);
  cuurCryptoCoin = this.cryptoCoin.asObservable();

  private message= new BehaviorSubject<CryptoCoin>(this.bitData);
  currMassamge = this.message.asObservable();

  constructor(private http: HttpClient) {}

  public getCryptoCoin(coin: CryptoCoin){
    this.cryptoCoin.next(coin)

  }


  public updateMessage(message: CryptoCoin){
    this.message.next(message)
  }


  public getRate(coins){
    return this.http.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`);
  }

  public getMarketPrice(){
    return this.http.get(`https://api.blockchain.info/charts/market-price?timespan=12months&format=json&cors=true`);
  }


  public getPrices(){
    return this.http.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,LTC,XRP&tsyms=USD,EUR,ILS')
  }

  public getDailyPair(from,to,days){
    const dailyPair = {
      from: from,
      to: to,
      days: days
    }
    this._dailyPair$.next(dailyPair);
    console.log(dailyPair,"dailyPair form serrvice")
    this.dailyPair$.subscribe(d=>{console.log("d=",d)})
    return this.http.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${from}&tsym=${to}&limit=${days-1}`)
    // return this.http.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=10`)
  }


  getNews(): Observable<News>{
    return this.http.get<News>('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
  }
 
}

