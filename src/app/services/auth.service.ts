import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model'
import { UserService } from '../services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:3000/users'

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private _isLoggedIn = true;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(name: string, password: string) {
    // this.userService.getUserByName(name)
    return this.http.post<any>(this.BASE_URL+'/authenticate', { name, password })
      .pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  checkLoggedIn() : Promise<boolean> {
    return new Promise((resolve, reject)=> {
      setTimeout(()=> {
        resolve(this._isLoggedIn);
      }, 1000);
    })
  }
}





















// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private _isLoggedIn = true;
//   constructor() { }

//   checkLoggedIn() : Promise<boolean> {
//     return new Promise((resolve, reject)=> {
//       setTimeout(()=> {
//         resolve(this._isLoggedIn);
//       }, 1000);
//     })
//   }
// }