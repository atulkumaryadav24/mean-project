import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.template'

@Injectable({providedIn:'root'})
export class PostService{
  constructor(private http:HttpClient, private router : Router){}
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPosts(){
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map(post=>{
        return{
          title : post.title,
        desc : post.desc,
        id : post._id
        }
      });
    }))
    .subscribe((transformedPosts)=>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title : string,desc : string){
    const post : Post = {
      id : null,
      title : title,
      desc : desc
    }
    this.http.post<{ message : string , postId : string }>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
      console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
  getPost(postId : string){
    return this.http.get<{_id : string, title : string, desc : string}>('http://localhost:3000/api/posts/' + postId);
  }
  updatePost(id : string, title : string, desc : string){
    const post : Post = {
      id : id,
      title : title,
      desc : desc
    };
    this.http.put('http://localhost:3000/api/posts/' + id,post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(()=>{
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
