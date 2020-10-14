import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubredditModel } from '../subreddit-response';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private subredditService: SubredditService, private spinner:NgxSpinnerService, private toastr:ToastrService) {
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  ngOnInit() {
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  createSubreddit() {
    this.spinner.show();
    this.subredditModel.name = this.createSubredditForm.get('title')
    .value;
    this.subredditModel.description = this.createSubredditForm.get('description')
    .value;
    this.subredditService.createSubreddit(this.subredditModel).subscribe(data => {
      this.router.navigateByUrl('/');
      this.toastr.success('Category created');
      this.spinner.hide();
    }, error => {
      this.toastr.error(error);
      this.spinner.hide();
    })
  }
}