import { Component } from "@angular/core";

@Component({
  selector: 'post-create',
  templateUrl : './post-create.component.html',
  styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent{
  enteredText='';
  postText = 'Nothing yet';
  onAddPost(){
    this.postText=this.enteredText;
  }
}
