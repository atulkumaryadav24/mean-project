import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'post-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class PostHeaderComponent implements OnInit,OnDestroy{
  userIsAuth = false;
  private authListenerSubs : Subscription;
  constructor(private authService: AuthService) {}
  ngOnInit(){
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.userIsAuth = isAuth;
      });
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
