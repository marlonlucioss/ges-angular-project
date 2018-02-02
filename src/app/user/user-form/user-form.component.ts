import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '@user/user-models/user';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { AuthService } from '@auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(public userService: UserService, public auth: AuthService,
              private appService: AppService,
              private route: ActivatedRoute) {}

  ngOnInit() {

    this.appService.getStates()
      .then((response) => {
        this.states = response.states;
      });

    switch (this.action) {
      case 'edit':
        this.route.params.subscribe(params => {
          this.userService.get(params['id']).then((response) => {
            this.user.serialize(response.user);
          });
        });
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
