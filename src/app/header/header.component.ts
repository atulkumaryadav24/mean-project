import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userIsAuth = false;
  private authListenerSubs : Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(){
    this.userIsAuth = this.authService.getAuthStatus();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
      });
  }
  onLogout(){
    this.authService.logoutUser();
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
