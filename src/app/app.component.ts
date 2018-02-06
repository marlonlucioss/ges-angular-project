import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  hasLogged;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private translate: TranslateService) {
    translate.setDefaultLang('pt-br'); 
  }
  ngOnInit() {
    if (!this.auth.isLogged()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngDoCheck() {
    if(this.auth.isLogged()) {
      this.hasLogged = true;
    } else {
      this.hasLogged = false;
    }
  }
}
