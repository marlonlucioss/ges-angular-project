import { Component, OnInit } from '@angular/core';

import { Company } from '@company/company';
import { CompanyService } from '@company/company.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
selector: 'app-company-show',
  templateUrl: './company-show.component.html',
  styleUrls: ['./company-show.component.scss']
})
export class CompanyShowComponent implements OnInit {

  public company: Company;
  public companyId: number;

  constructor(public companyService: CompanyService,
              private translate: TranslateService,
              public notify: MatSnackBar) {
    this.companyId = 1;
  }

  ngOnInit() {
    this.getCompany();
  }

  public getCompany() {

    this.companyService.get(this.companyId)
      .then((response) => {
        this.company = response['company'];
      })
      .catch((err) => {
        this.translate.get(['COMPANY.SHOW.GET_COMPANY_FAILURE']).subscribe(res => {
          this.notify.open(res['COMPANY.SHOW.GET_COMPANY_FAILURE'], 'ok', {
            duration: 2000
          });
        });
        console.log(err);
      });
  }

}
