import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyAddComponent } from './company-add/company-add.component';
import { RoleGuardService } from '@auth/role-guard.service';

const routes: Routes = [
  {
    path: 'company/list',
    component: CompanyListComponent
  },
  {
    path: 'company/show/:id',
    component: CompanyShowComponent
  },
  {
    path: 'company/edit/:id',
    component: CompanyEditComponent
  },
  {
    path: 'company/add',
    component: CompanyAddComponent
    /*
    canActivate: [RoleGuardService],
    data: {
      roles: ['root']
    }
    */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
