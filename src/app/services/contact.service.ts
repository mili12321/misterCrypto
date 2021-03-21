import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../models/contact.model'
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private BASE_URL = 'http://localhost:3000/contact'
  
  constructor(private http: HttpClient) {}


  private _contacts$ = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contacts$.asObservable()

  private _allContacts$ = new BehaviorSubject<Contact[]>([]);
  public allContacts$ = this._allContacts$.asObservable()

  private _isFavorite$ = new BehaviorSubject<boolean>(false);
  public isFavorite$ = this._isFavorite$.asObservable()

  public loadContacts(filterBy = { name: '', phone: '', category: '' , isFavorite: false}) {
    this.http.get<Contact[]>(this.BASE_URL)
      .pipe(
        map(contacts => {
          if (filterBy.category !== '') {
            const newContacts = contacts.filter(({ category }) => {
              return category.toLowerCase().includes(filterBy.category)
            })
            if (filterBy.name !== '' && filterBy.phone !== '') {
              return newContacts.filter(({ name,phone }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase())&&phone.replace(/\D/g,'').includes(filterBy.phone);
              })
            }
            else if (filterBy.name !== '') {
              return newContacts.filter(({ name }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase());
              })
            }
            else if (filterBy.phone !== '') {
              return newContacts.filter(({ phone }) => {
                return phone.replace(/\D/g,'').includes(filterBy.phone)
              })
            }
            else {
              return newContacts;
            }
          }
          else if (filterBy.isFavorite === true) {
            const newContacts = contacts.filter(contact=>contact.isFavorite===true);
            if (filterBy.name !== '' && filterBy.phone !== '') {
              return newContacts.filter(({ name,phone }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase())&&phone.replace(/\D/g,'').includes(filterBy.phone);
              })
            }
            else if (filterBy.name !== '') {
              return newContacts.filter(({ name }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase());
              })
            }
            else if (filterBy.phone !== '') {
              return newContacts.filter(({ phone }) => {
                return phone.replace(/\D/g,'').includes(filterBy.phone)
              })
            }
            else {
              return newContacts;
            }
          }
          else{
            if (filterBy.name !== '' && filterBy.phone !== '') {
              return contacts.filter(({ name,phone }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase())&&phone.replace(/\D/g,'').includes(filterBy.phone);
              })
            }
            else if (filterBy.name !== '') {
              return contacts.filter(({ name }) => {
                return name.toLowerCase().includes(filterBy.name.toLowerCase());
              })
            }
            else if (filterBy.phone !== '') {
              return contacts.filter(({ phone }) => {
                return phone.replace(/\D/g,'').includes(filterBy.phone)
              })
            }
            else {
              return contacts;
            }

          }
        })
      ).subscribe(contacts => {
        this._contacts$.next(contacts);
        this.http.get<Contact[]>(this.BASE_URL).subscribe(contacts => {
          this._allContacts$.next(contacts);
        });
      })
  }

  public loadAllContacts() {
   return this.http.get<Contact[]>(this.BASE_URL).subscribe(contacts => {
      this._allContacts$.next(contacts);
    });
  }

  public checkFavorite(isFav: boolean){
    this._isFavorite$.next(isFav);
  }

  public getContactById(_id: string){
    return this.http.get<Contact>(this.BASE_URL + `/${_id}`)
    .pipe(
      retry(1),
      catchError(() => throwError('no contact found!'))
    );
  }

  public remove(contactId,filterBy){
    return this.http.delete<Contact>(this.BASE_URL + `/${contactId}`)
    .subscribe(data => {
      this.loadAllContacts() 
      //const contacts = this._constacts$.getValue().filter(contact => contact._id !== contactId)  49:47
      // this._contacts$.next(contacts)
      this.loadContacts(filterBy)
    })
  }

  public save(contact: Contact,filterBy = { name: '', phone: '', category: '' , isFavorite: false}){
    if(contact._id){
      return this.http.put<Contact>(this.BASE_URL + `/${contact._id}`,contact).subscribe(contact => {
        this.loadAllContacts() 
        this.loadContacts(filterBy)
      });
    }else{
      return this.http.post<Contact>(this.BASE_URL,contact).subscribe(contact =>{
        this.loadAllContacts() 
        this.loadContacts(filterBy)
      })}
    
  }
}