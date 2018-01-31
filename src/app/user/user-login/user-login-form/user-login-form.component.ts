import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '@user/user.service';
import { UserLogin } from '@user/user-models/user-login';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  public user: UserLogin;

  constructor(private userService: UserService, private router: Router) {}

  public doLogin(form: NgForm) {

    this.user = new UserLogin();
    this.user.serialize(form.value);

    this.userService.login(this.user)
      .then((response) => {
        if (!response.status) {
          this.router.navigateByUrl('/dashboard');
        } else {
          if (response.status == 401) {
            console.log('Não autorizado');
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  ngOnInit() {}

}
