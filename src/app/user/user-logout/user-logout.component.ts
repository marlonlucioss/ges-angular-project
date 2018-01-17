import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../user.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  public doLogout() {
    if (this.userService.logout()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}
