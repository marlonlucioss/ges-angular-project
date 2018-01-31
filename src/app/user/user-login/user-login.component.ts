import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
