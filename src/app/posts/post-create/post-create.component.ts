import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../post.template";
import { PostService } from '../posts.service';
import { mimeType } from "./mime-type.validator";
@Component({
  selector: 'post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit,OnDestroy{
  // enteredText='';
  // postText = 'Nothing yet';
  post : Post;
  private postId : string;
  private mode = 'create';
  isLoading = false;
  form : FormGroup;
  imagePreview : string;
  authStatusSubs : Subscription;
  ngOnInit(){
  this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
    authStatus => {
      this.isLoading = false;
    }
  );
  this.form = new FormGroup({
    'title' : new FormControl(null , {
      validators:[Validators.required , Validators.minLength(3)]
    }),
    'desc' : new FormControl(null, {
      validators : [Validators.required]
    }),
    'image' : new FormControl(null, {
      validators : [Validators.required],
      asyncValidators : [mimeType]
    })
  });
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
            desc : postData.desc,
            imagePath : postData.imagePath,
            creator : ''
          };
          this.form.setValue({
            'title': this.post.title,
            'desc' : this.post.desc,
            'image' : this.post.imagePath
          });
        });
       }
       else{
        this.mode = 'create';
        this.post = null;
       }
    });
  }
  constructor(public postService : PostService, public route : ActivatedRoute, private authService: AuthService){}

  onImagePicked(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image':file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  onSavePost(){
    if(this.form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postService.addPost(this.form.value.title,this.form.value.desc,this.form.value.image);
    }
    else if(this.mode === 'edit'){
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.desc,
        this.form.value.image
        );
    }
    this.form.reset();
  }
  ngOnDestroy(){
      this.authStatusSubs.unsubscribe();
  }
}
