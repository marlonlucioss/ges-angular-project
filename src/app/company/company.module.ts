import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { FormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormComponent } from './company-form/company-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CompanyRoutingModule
  ],
  exports: [
    CompanyFormComponent
  ],
  declarations: [
    CompanyAddComponent,
    CompanyListComponent,
    CompanyShowComponent,
    CompanyEditComponent,
    CompanyFormComponent
  ]
})
export class CompanyModule { }
