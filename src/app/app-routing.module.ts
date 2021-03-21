import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { ContactAddComponent } from './cmps/contact-add/contact-add.component';
import { AuthGuard } from './guards/auth.guard';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { StockChartResolverService } from './services/stock-chart-resolver.service';
import { NewsResolverService } from './services/news-resolver.service';
import { RegisterPageComponent } from 'src/app/pages/register-page/register-page.component';
import { LoginPageComponent } from 'src/app/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard], resolve:{
    dailyPair:StockChartResolverService,
    dailyNews:NewsResolverService
  } },
  { path: 'contacts', component: ContactPageComponent,
    canActivate: [AuthGuard],
  //   children: [
  //   { path: 'edit', component: ContactEditComponent }
  // ] 
},
  { path: 'contacts/:contactId', component: ContactDetailsPageComponent },
  { path: 'edit/:id', component: ContactEditComponent },
  // { path: 'edit', component: ContactEditComponent },
  { path: 'edit', component: ContactAddComponent },
  { path: 'news', component: NewsPageComponent },

  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
