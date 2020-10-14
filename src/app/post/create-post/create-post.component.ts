import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SubredditModel } from 'src/app/subreddit/subreddit-response';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;
  ckeConfig:any;
  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService, private spinner: NgxSpinnerService, private toastr:ToastrService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    this.spinner.show();
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
      this.toastr.error('Failed to load');
    });
  }

  createPost() {
    this.spinner.show();
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.toastr.success('Post created');
      this.router.navigateByUrl('/');
      this.spinner.hide();
    }, error => {
      this.toastr.error('Post creation error');
      this.spinner.hide();
    })
  }

  discardPost() {
    this.spinner.show();
    this.router.navigateByUrl('/');
    this.spinner.hide();
  }

}