import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyShowComponent } from './company-show/company-show.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { FormsModule } from '@angular/forms';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormComponent } from './company-form/company-form.component';

import {TranslateModule} from '@ngx-translate/core';
import { CompanyNavComponent } from './company-nav/company-nav.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    CompanyRoutingModule
  ],
  exports: [
    CompanyFormComponent,
    TranslateModule
  ],
  declarations: [
    CompanyAddComponent,
    CompanyListComponent,
    CompanyShowComponent,
    CompanyEditComponent,
    CompanyFormComponent,
    CompanyNavComponent
  ]
})
export class CompanyModule { }
