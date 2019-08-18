import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CONDOMINIO_KIPER_API } from '../app.api';
import { map } from 'rxjs/operators';

import { User } from './user.model';

import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('KiperCondominioToken')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  login(email: string, password: string) {
    return this.http.post<any>(`${CONDOMINIO_KIPER_API}/login`, { email, password })
      .pipe(map(user => {
        if (user.data && user.data.access_token) {
          localStorage.setItem('KiperCondominioToken', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
        }
        return user.data;
      }));
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): string {
    return localStorage.getItem('KiperCondominioToken');
  }

  getUserName(){
    return localStorage.getItem('UserName');
  }

  setToken(token: string): void {
    localStorage.setItem('KiperCondominioToken', token);
  }
  
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  logout(url?) {
    if (url && url !== null)
      this.router.navigate(['/login'], url);
    else
      this.router.navigate(['/login']);

      this.currentUserSubject.next(null);
    localStorage.removeItem('KiperCondominioToken');
  }
}