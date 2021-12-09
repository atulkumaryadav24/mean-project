import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.template";
import { PostService } from "../posts.service";
@Component({
  selector:'post-list',
  templateUrl:'./post-list.component.html',
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  posts : Post[] = [];
  private postSubs : Subscription;
  constructor(public postService : PostService){}
  ngOnInit(){
    this.posts=this.postService.getPost();
    this.postSubs = this.postService.getPostUpdateListener().subscribe((posts : Post[])=>{
      this.posts=posts;
    });
  }
  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }
}
