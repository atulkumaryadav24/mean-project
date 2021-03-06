import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.template';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + '/posts/';
const BACKEND_QUERY_URL = environment.apiUrl + '/posts';
@Injectable({providedIn:'root'})
export class PostService{
  constructor(private http:HttpClient, private router : Router){}
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts : Post[], totalPosts : number}>();
  getPosts(postPerPage : number, currentPage : number){
    const queryParam = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http.get<{message : string, posts : any, maxPosts : number}>
      (BACKEND_QUERY_URL + queryParam)
    .pipe(map((postData)=>{
      return { posts : postData.posts.map(post=>{
        return{
        title : post.title,
        desc : post.desc,
        id : post._id,
        imagePath : post.imagePath,
        creator : post.creator
        };
      }),
      maxPosts : postData.maxPosts
    }
    }))
    .subscribe((transformedPostsData)=>{
      this.posts = transformedPostsData.posts;
      this.postsUpdated.next({
        posts : [...this.posts],
        totalPosts : transformedPostsData.maxPosts
      });
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
    this.http.post<{ message : string , post : Post }>(BACKEND_URL ,postData)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      this.router.navigate(["/"]);
    });
  }
  getPost(postId : string){
    return this.http.get<{ _id: string, title: string, desc: string, imagePath: string, creator: string }>(BACKEND_URL + postId);
  }
  updatePost(id : string, title : string, desc : string, image :File | string){
    let postData : Post | FormData;
    if(typeof(image) === 'object'){
      postData = new FormData();
      postData.append('id',id);
      postData.append('title',title);
      postData.append('desc',desc);
      postData.append('image',image,title);
      postData.append('creator','');
    }
    else{
      postData = {
        id : id,
        title : title,
        desc:desc,
        imagePath : image,
        creator : ''
      }
    }
    this.http.put(BACKEND_URL + id,postData).subscribe(response => {
      this.router.navigate(["/"]);
    });
  }
  deletePost(postId: string){
    return this.http.delete(BACKEND_URL + postId);
  }
}
