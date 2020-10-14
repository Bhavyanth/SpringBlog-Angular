import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn: boolean;
  username: string;
  photo:string;

  constructor(private authService: AuthService, private router: Router, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.photo = "https://ui-avatars.com/api/?name="+this.username;
    this.spinner.hide();
  }

  goToUserProfile() {
    this.spinner.show();
    this.router.navigateByUrl('/user-profile/' + this.username);
    this.spinner.hide();
  }

  logout() {
    this.spinner.show();
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
    this.spinner.hide();
  }
}
