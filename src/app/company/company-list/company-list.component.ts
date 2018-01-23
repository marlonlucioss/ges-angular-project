import { Component, OnInit } from '@angular/core';
import { Company } from '@company/company';
import { CompanyService } from '@company/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(public companyService: CompanyService) { }

  public companies: Company[];

  ngOnInit() {
    this.getCompanies();
  }

  public getCompanies() {

    this.companyService.fetch()
      .then((response) => {
        this.companies = response.companies;
      })
      .catch((err) => {
        console.log('Notify error');
      });
  }

}
