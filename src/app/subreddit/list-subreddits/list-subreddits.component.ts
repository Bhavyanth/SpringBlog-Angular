import { Component, OnInit } from '@angular/core';
import { SubredditModel } from '../subreddit-response';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<SubredditModel>;
  constructor(private subredditService: SubredditService, private spinner:NgxSpinnerService, private toastr:ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
      this.spinner.hide();
    }, error => {
      this.toastr.error('Failed to load categories');
      this.toastr.info('Either URL may be incorrect or session has expired');
      this.spinner.hide();
    })
  }
}