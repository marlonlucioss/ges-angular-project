import { Component, OnInit } from '@angular/core';
import { User } from '../user-models/user';
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit {

  public user: User;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }

}
