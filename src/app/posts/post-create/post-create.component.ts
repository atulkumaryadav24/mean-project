import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from '../posts.service'
@Component({
  selector: 'post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{
  // enteredText='';
  // postText = 'Nothing yet';
  constructor(public postService : PostService){}
  onAddPost(saveForm : NgForm){
    if(saveForm.invalid){
      return;
    }
    this.postService.addPost(saveForm.value.title,saveForm.value.desc);
    saveForm.resetForm();
  }
}
