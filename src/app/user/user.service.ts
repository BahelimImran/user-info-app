import { Injectable } from '@angular/core';
import { User } from './user-list/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    const apiUrl = this.apiUrl + `?limit=0&select=id,firstName,lastName,age,address`;
    return this.http.get<User[]>(apiUrl);
  }
}
