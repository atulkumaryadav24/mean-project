import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({providedIn:'root'})
export class AuthService {
  private token: string;
  isAuth: boolean = false;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient){}

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
      });
  }

  loginUser(email: string, password: string){
    const authData : AuthData = {email: email, password: password};
    this.http.post<{token : string}>("http://localhost:3000/api/users/login",authData)
      .subscribe(response => {
        this.token = response.token;
        if(this.token){
          this.isAuth = true;
          this.authStatusListener.next(true);
        }
      });
  }
}
