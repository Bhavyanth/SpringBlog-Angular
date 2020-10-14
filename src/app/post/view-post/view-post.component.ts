import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router, private spinner:NgxSpinnerService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.spinner.show();
    this.getPostById();
    this.getCommentsForPost();
    this.spinner.hide();
  }

  postComment() {
    this.spinner.show();
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      throwError(error);
    })
  }

  private getPostById() {
    this.spinner.show();
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.spinner.show();
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      throwError(error);
    });
  }

}
