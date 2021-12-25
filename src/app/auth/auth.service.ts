import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class AuthService {
  private token: string;
  isAuth: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  constructor(private http: HttpClient, private router: Router){}

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getToken(){
    return this.token;
  }
  getAuthStatus(){
    return this.isAuth;
  }
  createUser(email : string, password : string){
    const authData : AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/users/signup",authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/login']);
      });
  }

  loginUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post<{token : string, expiresIn: number}>("http://localhost:3000/api/users/login",authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if(token){
          const expiresInDuration = response.expiresIn;

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser(){
    const authData = this.getAuthData();
    if(!authData){
      return;
    }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      this.token = authData.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logoutUser(){
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expiration"));
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: expirationDate
    }
  }
  private setAuthTimer(expiresInDuration: number){
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, expiresInDuration * 1000);
  }
}
