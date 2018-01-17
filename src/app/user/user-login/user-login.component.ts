import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

import { UserService } from './../user.service';
import { UserLogin } from './user-login';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public doLogin(form: NgForm) {

    if (this.userService.login(JSON.stringify(form.value))) {
      this.router.navigateByUrl('/dashboard');
    }

  }

  ngOnInit() {
  }

}
