import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service';
import {News} from 'src/app/models/news.model'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  constructor(private bitcoinService: BitcoinService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getNews()
  }

  faLongArrowAltRight=faLongArrowAltRight
  
  news:News ;
  isLoading: boolean;

  getNews(){
    this.bitcoinService.getNews().subscribe(res=>{ 
      this.news = res["Data"]
    })
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }

}
