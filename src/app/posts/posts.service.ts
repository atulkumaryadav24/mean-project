import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.template';

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
        id : post._id,
        imagePath : post.imagePath
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
  addPost(title : string,desc : string, image : File){
    const postData = new FormData();
    postData.append("title", title);
    postData.append("desc",desc);
    postData.append("image", image, title);
    this.http.post<{ message : string , post : Post }>('http://localhost:3000/api/posts',postData)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      const post : Post = {
        id : responseData.post.id,
        title : title,
        desc : desc,
        imagePath : responseData.post.imagePath
      };
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
  }
  getPost(postId : string){
    return this.http.get<{_id : string, title : string, desc : string, imagePath : string}>('http://localhost:3000/api/posts/' + postId);
  }
  updatePost(id : string, title : string, desc : string, image :File | string){
    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id',id);
      postData.append('title',title);
      postData.append('desc',desc);
      postData.append('image',image,title);
    }
    else{
      postData = {
        id : id,
        title : title,
        desc:desc,
        imagePath : image
      }
    }
    this.http.put('http://localhost:3000/api/posts/' + id,postData).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post : Post={
        id : id,
        title : title,
        desc:desc,
        imagePath : ""
      }
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
