import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@user/user-models/user';

import { UserService } from '@user/user.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  public doLogout() {
    this.userService.logout()
      .then(() => {
        this.router.navigateByUrl('/login');
      })
      .catch(() => {
        console.log('Notify error');
      });
  }

  ngOnInit() {}

}
