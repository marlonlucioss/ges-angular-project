import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginFormComponent } from './user-login/user-login-form/user-login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatFormFieldModule } from '@angular/material';
import {TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    UserRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    UserLoginFormComponent
  ],
  declarations: [
    UserEditComponent,
    UserShowComponent,
    UserListComponent,
    UserAddComponent,
    UserLoginFormComponent,
    UserFormComponent
  ]
})
export class UserModule { }
