import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '@user/user-models/user';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() action: string;

  public user: User = new User();
  public states = [];
  public cities = [];

  constructor(public userService: UserService, public auth: AuthService, private appService: AppService) {}

  ngOnInit() {

    this.appService.getStates()
      .then((response) => {
        this.states = response.states;
      });

    switch (this.action) {
      case 'edit':
        this.user.serialize(this.auth.getCurrentUser());
        break;
    }
  }

  changeState(stateId) {
    this.appService.getCities(stateId)
      .then((response) => {
        this.cities = response.cities;
      });
  }

  public submit(form: NgForm) {

    switch (this.action) {
      case 'edit':
        this.userService.edit(this.user)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Notify error');
          });
        break;
      case 'add':
        this.userService.add(this.user)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Notify error');
          });
        break;
    }
  }
}
