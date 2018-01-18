import { Component, OnInit } from '@angular/core';
import { User } from './../user';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {

  public user: User;

  constructor() { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
  }

}
