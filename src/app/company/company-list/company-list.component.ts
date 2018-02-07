import { Component, OnInit } from '@angular/core';
import { Company } from '@company/company';
import { CompanyService } from '@company/company.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(public companyService: CompanyService, public notify: MatSnackBar, private translate: TranslateService ) { }

  companies: Company[];

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {

    this.companyService.fetch()
      .then((response) => {
        this.companies = response['companies'];
        console.log(this.companies);
      })
      .catch((err) => {
        this.translate.get(['COMPANY.LIST.GET_COMPANY_FAILURE']).subscribe(res => {
          this.notify.open(res['COMPANY.LIST.GET_COMPANY_FAILURE'], 'ok', {
            duration: 2000
          });
        });
      });
  }

}
