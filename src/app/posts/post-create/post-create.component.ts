import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.template";
import { PostService } from '../posts.service'
@Component({
  selector: 'post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  // enteredText='';
  // postText = 'Nothing yet';
  post : Post;
  private postId : string;
  private mode = 'create';
  isLoading = false;
  ngOnInit(){
  this.route.paramMap.subscribe((paramMap : ParamMap)=>{
       if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData =>{
          this.isLoading = false;
          this.post = {
            id : postData._id,
            title : postData.title,
            desc : postData.desc
          };
        });
       }
       else{
        this.mode = 'create';
        this.post = null;
       }
    });
  }
  constructor(public postService : PostService, public route : ActivatedRoute){}
  onSavePost(saveForm : NgForm){
    if(saveForm.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postService.addPost(saveForm.value.title,saveForm.value.desc);
    }
    else if(this.mode === 'edit'){
      this.postService.updatePost(this.postId,saveForm.value.title,saveForm.value.desc);
    }
    saveForm.resetForm();
  }
}
