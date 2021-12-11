import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.template'
import { HttpClient } from '@angular/common/http';
@Injectable({providedIn:'root'})
export class PostService{
  constructor(private http:HttpClient){}
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPost(){
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postsData)=>{
      this.posts = postsData.posts;
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
    this.http.post<{message:string}>('http://localhost:3000/api/posts',post).subscribe((responseData)=>{
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
