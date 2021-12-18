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
  isLoading = false;
  constructor(public postService : PostService){}
  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts();
    this.postSubs = this.postService.getPostUpdateListener().subscribe((posts : Post[])=>{
      this.isLoading = false;
      this.posts=posts;
    });
  }
  onDelete(postId : string){
    this.postService.deletePost(postId);
  }
  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }
}
