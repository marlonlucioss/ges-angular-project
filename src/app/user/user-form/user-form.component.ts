import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '@user/user-models/user';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { AuthService } from '@auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { patternValidator } from '@app/directives/form/input-pattern-validator.directive';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public userForm: FormGroup;

  constructor(public userService: UserService, public auth: AuthService,
              private appService: AppService,
              private route: ActivatedRoute,
              private router: Router,
              public notify: MatSnackBar) {}

  public changeState(stateId) {
    this.appService.getCities(stateId)
      .then((response) => {
        this.cities = response.cities;
      });
  }

  ngOnInit() {

    this.appService.getStates()
      .then((response) => {
        this.states = response.states;
      });

    switch (this.action) {
      case 'edit':
        this.route.params.subscribe(params => {
          this.userService.get(params['id']).then((response) => {
            this.user.serialize(response['user']);
            this.changeState(this.user.user_address_attributes.state_id);
          });
        });
        break;
    }

    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, [Validators.required]),
      lastname: new FormControl(this.user.lastname, [Validators.required]),
      password: this.getPasswordValidator(),
      password_confirmation: this.getPasswordConfirmationValidator(),
      cpf: new FormControl(this.user.user_info_attributes.cpf, [Validators.required]),
      rg: new FormControl(this.user.user_info_attributes.rg, [Validators.required]),
      sex: new FormControl(this.user.user_info_attributes.sex, [Validators.required]),
      date_birth: new FormControl(this.user.user_info_attributes.date_birth, [Validators.required]),
      phone: new FormControl(this.user.user_info_attributes.phone, [Validators.required]),
      marital_status: new FormControl(this.user.user_info_attributes.marital_status, [Validators.required]),
      naturalness: new FormControl(this.user.user_info_attributes.naturalness, [Validators.required]),
      state_id: new FormControl(this.user.user_address_attributes.state_id, [Validators.required]),
      city_id: new FormControl(this.user.user_address_attributes.city_id, [Validators.required]),
      postal_code: new FormControl(this.user.user_address_attributes.postal_code, [Validators.required]),
      neighborhood: new FormControl(this.user.user_address_attributes.neighborhood, [Validators.required]),
      number: new FormControl(this.user.user_address_attributes.number, [Validators.required]),
      complement: new FormControl(this.user.user_address_attributes.complement, [Validators.required]),
      street: new FormControl(this.user.user_address_attributes.street, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
    });
  }

  private getPasswordValidator(): FormControl {
    return this.action === 'add' ? new FormControl(this.user.password, [Validators.required]) : new FormControl(this.user.password);
  }

  private getPasswordConfirmationValidator(): FormControl {
    return this.action === 'add' ? new FormControl(this.user.password_confirmation, [Validators.required]) : new FormControl(this.user.password_confirmation);
  }

  public submit(form: NgForm) {

    form.controls['password_confirmation'].setErrors(null);

    if (!form.valid) {
      for (const field of Object.keys(form.controls)) {
        form.controls[field].markAsTouched();
        form.controls[field].markAsDirty();
      }
      this.notify.open('Fill all required fields', 'ok', {
        duration: 2000
      });
      return;
    }

    if (form.value.password !== form.value.password_confirmation) {
      this.userForm.controls['password_confirmation'].markAsTouched();
      this.userForm.controls['password_confirmation'].markAsDirty();
      form.controls['password_confirmation'].setErrors({
        'matchError' : true
      });
      this.notify.open('Check out the fields', 'ok', {
        duration: 2000
      });
      return;
    } else {
      form.controls['password_confirmation'].setErrors(null);
    }

    switch (this.action) {
      case 'edit':
        this.userService.edit(this.user)
          .then((response) => {
            this.notify.open('User saved', 'ok', {
              duration: 2000
            });
          })
          .catch((err) => {
            this.notify.open('A Problem has accurred', 'ok', {
              duration: 2000
            });
          });
        break;
      case 'add':
        this.userService.add(this.user)
          .then((response) => {
            this.notify.open('User saved', 'ok', {
              duration: 2000
            });
            this.router.navigateByUrl('/user/edit/' + response['user'].id );
          })
          .catch((err) => {
            this.notify.open('A Problem has accurred', 'ok', {
              duration: 2000
            });
          });
        break;
    }
  }

}
