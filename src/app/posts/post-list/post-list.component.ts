import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
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
  totalPosts = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  constructor(public postService : PostService){}
  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts(this.postPerPage,this.currentPage);
    this.postSubs = this.postService.getPostUpdateListener().subscribe(
      (postData : {posts : Post[], totalPosts : number})=>{
      this.isLoading = false;
      this.posts=postData.posts;
      this.totalPosts = postData.totalPosts;
    });
  }
  onPageChange(pageData : PageEvent){
    this.isLoading = true;
    this.postPerPage = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.postService.getPosts(this.postPerPage,this.currentPage);
  }

  onDelete(postId : string){
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() =>{
      this.postService.getPosts(this.postPerPage,this.currentPage);
    });
  }
  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }
}
