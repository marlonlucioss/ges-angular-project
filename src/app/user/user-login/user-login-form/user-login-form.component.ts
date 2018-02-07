import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '@user/user.service';
import { UserLogin } from '@user/user-models/user-login';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  user:       UserLogin;
  notifyMsg:  String = "";
  notifyTime: number = 1000;

  constructor(
    private userService: UserService,
    private router: Router,
    private translate: TranslateService) {}

  doLogin(form: NgForm) {

    this.user = new UserLogin();
    this.user.serialize(form.value);


    if (Object.values(this.user)[0] === undefined || Object.values(this.user)[1] === undefined ) {
      this.notifyMsg = 'Um ou mais campos não foram preenchidos !';
      this.notifyTime = 5000;
      this.userService.notifyAuthError(this.notifyMsg, this.notifyTime);
    } else {
      this.userService.login(this.user)
      .then((response) => {
        if (!response['status']) {
          this.router.navigateByUrl('/dashboard');
        } else {
          if (response['status'] === 401) {
            this.notifyMsg = 'Um ou mais campos não foram preenchidos !';
            this.notifyTime = 5000;
            this.userService.notifyAuthError('Usuário não permitido', 5000);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

  }

  ngOnInit() {}

}
