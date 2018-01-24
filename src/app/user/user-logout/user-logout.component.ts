import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@user/user';

import { UserService } from '@user/user.service';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  public user = User;

  constructor(private userService: UserService,private router: Router, private authService: AuthService) {
    this.user = authService.getCurrentUser();
    console.log(this.user);
  }

  public doLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigateByUrl('/login');
      })
      .catch(() => {
        console.log('Notify error');
      });
  }

  ngOnInit() {
  }

}
