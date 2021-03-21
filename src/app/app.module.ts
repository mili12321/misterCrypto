import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { FilterPipe } from './cmps/filter.pipe';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { ContactAddComponent } from './cmps/contact-add/contact-add.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { MovesListComponent } from './cmps/moves-list/moves-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoinTypeBalanceComponent } from './cmps/coin-type-balance/coin-type-balance.component';
import { CoinTypeBalancePreviewComponent } from './cmps/coin-type-balance-preview/coin-type-balance-preview.component';
import { CoinDesk24Component } from './cmps/coin-desk24/coin-desk24.component';
import { CoinDeskComponent } from './cmps/coin-desk/coin-desk.component';
import { CommonModule } from '@angular/common';
import { StockChartComponent } from './cmps/stock-chart/stock-chart.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService,CandleSeriesService } from '@syncfusion/ej2-angular-charts';
import { DataLabelService, LineSeriesService} from '@syncfusion/ej2-angular-charts';
import { NewsComponent } from './cmps/news/news.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { JwtInterceptor } from 'src/app/interceptor/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/interceptor/error.interceptor';
import {fakeBackendProvider
} from 'src/app/interceptor/fake-backend';
import { AlertComponent } from './cmps/alert/alert.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StopPropagationDirective } from './stop-propagation.directive';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    ContactDetailsPageComponent,
    StatisticPageComponent,
    ContactPreviewComponent,
    ContactListComponent,
    ContactFilterComponent,
    FilterPipe,
    ContactEditComponent,
    ContactAddComponent,
    TransferFundComponent,
    MovesListComponent,
    CoinTypeBalanceComponent,
    CoinTypeBalancePreviewComponent,
    CoinDesk24Component,
    CoinDeskComponent,
    StockChartComponent,
    NewsComponent,
    NewsPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AlertComponent,
    StopPropagationDirective


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GoogleChartsModule,
    FontAwesomeModule,
    CommonModule,
    ChartModule,
    NgbModule
   
  ],
  providers: [ CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService,CandleSeriesService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  // provider used to create fake backend
  fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
