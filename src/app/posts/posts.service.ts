import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.template'
@Injectable({providedIn:'root'})
export class PostService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  getPost(){
    return [...this.posts];
  }
  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }
  addPost(title : string,desc : string){
    const post : Post = {
      title : title,
      desc : desc
    }
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);

  }
}
