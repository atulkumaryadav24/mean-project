import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + '/users/';
@Injectable({providedIn:'root'})
export class AuthService {
  private token: string;
  isAuth: boolean = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private userId : string;
  constructor(private http: HttpClient, private router: Router){}

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getToken(){
    return this.token;
  }
  getUserId(){
    return this.userId;
  }
  getAuthStatus(){
    return this.isAuth;
  }
  createUser(email : string, password : string){
    const authData : AuthData = {email: email, password: password};
    this.http.post(BACKEND_URL + 'signup',authData)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      }, (error) =>{
        this.authStatusListener.next(false);
      });
  }

  loginUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + 'login',authData)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if(token){
          this.userId = response.userId;
          const expiresInDuration = response.expiresIn;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
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
      this.userId = authData.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logoutUser(){
    this.token = null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  saveAuthData(token: string, expirationDate: Date, userId : string){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId",userId);
  }
  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expiration"));
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: expirationDate,
      userId : userId
    }
  }
  private setAuthTimer(expiresInDuration: number){
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, expiresInDuration * 1000);
  }
}
