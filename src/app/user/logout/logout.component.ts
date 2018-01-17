import { Component, OnInit } from '@angular/core';

import { UserService } from './../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService ) { }

  public doLogout() {
    this.userService.logout();
  }

  ngOnInit() {
  }

}
