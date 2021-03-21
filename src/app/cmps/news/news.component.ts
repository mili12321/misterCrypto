import { Component, OnInit,Input } from '@angular/core';
import {News} from 'src/app/models/news.model'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() {
    this.timeOut();
    this.isLoading = true;
   }

  ngOnInit(): void {
    this.dailyNews = this.dailyNews.slice(0, 5)
  }

  @Input() dailyNews
  isLoading: boolean;
  item:News;
  current = 0;
  prev = -1;

  faChevronLeft=faChevronLeft
  faChevronRight=faChevronRight

  ngAfterViewInit() {
    this.isLoading = false;
  }
  

timeOut(){
  setInterval(() => {
    if(this.current === this.dailyNews.length ){
      this.current = 0;
    }
    this.item = this.dailyNews[this.current]
    this.current++
  },7000)
}


  onPrev() {
    if(this.current===0){
     return
    }else{
      this.prev = this.current--;
    }
    this.item = this.dailyNews[this.current]
  }

  onNext() {
    if(this.current === this.dailyNews.length){
      this.current=0;
    }else{
      this.prev = this.current++ ;
    }
    this.item = this.dailyNews[this.current]
  }

}
