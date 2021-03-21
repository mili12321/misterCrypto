import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model'
import { Move } from '../models/move.model'
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Contact } from '../models/contact.model'




@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:3000/user'

  userSubscription: Subscription;
  user: User;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe(user => {
      this.user = user
    })
  }

  // private _user$ = new BehaviorSubject<User>(null)
  private _user$ = new BehaviorSubject<any>(null)
  public user$ = this._user$.asObservable()
  
 
  public setUser(user: User) {
    this._user$.next(user);
    this.user$.subscribe(user => {
    })
  }

  public getUser(user: User) {
    this.setUser(user);
    this.http.put<Contact>(this.BASE_URL + `/${user._id}`,user).subscribe()
    return this.http.get<User>(this.BASE_URL + `/${user._id}`)
  }

  public getUsers(){
    return this.http.get<User[]>(this.BASE_URL)
  }

  getAll() { //all register users
    return this.http.get<User[]>(`${this.BASE_URL}s`);
  }


  register(user: User) {
    return this.http.post(this.BASE_URL + 's/register', user);
  }

  makeUserAccount(user: User){
    var newUser={
      name: "",
      coins: 100,
      moves: []
    }
    newUser.name=user.name
    this.http.post(this.BASE_URL, newUser).pipe(
      catchError(() => throwError(`Couldn't update user ${newUser}`))
    ).subscribe()
  }

  delete(id: string) {
    return this.http.delete(this.BASE_URL + 's/' + id);
  }

 
  
  public addMove(contact: Contact ,amount: number){
    var move = {
      toId: "",
      to: "",
      at: null,
      amount: null
    }
    move.toId = contact._id
    move.to = contact.name
    move.at = Date.now()
    move.amount = amount

    this.user.moves=[move,...this.user.moves]
    this.user.coins=this.user.coins-amount
  
    this.setUser(this.user);
    return this.http.put<User>(this.BASE_URL + `/${this.user._id}`,this.user)
  }
}
