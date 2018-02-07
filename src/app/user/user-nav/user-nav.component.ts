import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { User } from '@user/user-models/user';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {

  public user;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

}
