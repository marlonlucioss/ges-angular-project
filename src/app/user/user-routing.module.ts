import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: UserShowComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent
  },
  {
    path: 'user/add',
    component: UserAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
