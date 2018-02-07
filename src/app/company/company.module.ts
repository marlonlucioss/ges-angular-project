import { MatGridListModule, MatFormFieldModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormComponent } from './company-form/company-form.component';

import {TranslateModule} from '@ngx-translate/core';
import { CompanyNavComponent } from './company-nav/company-nav.component';
import { CompanyUsersComponent } from './company-users/company-users.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CompanyRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    CompanyFormComponent,
    CompanyNavComponent,
    CompanyUsersComponent
  ],
  declarations: [
    CompanyAddComponent,
    CompanyListComponent,
    CompanyShowComponent,
    CompanyEditComponent,
    CompanyFormComponent,
    CompanyNavComponent,
    CompanyUsersComponent
  ]
})
export class CompanyModule { }
