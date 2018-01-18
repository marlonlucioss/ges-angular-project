import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/show/:id',
    component: UserShowComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent
  },
  {
    path: 'user/add',
    component: UserAddComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: UserLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
