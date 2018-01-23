import { Component, OnInit } from '@angular/core';

import { Company } from './../company';
import { CompanyService } from './../company.service';

@Component({
  selector: 'app-company-show',
  templateUrl: './company-show.component.html',
  styleUrls: ['./company-show.component.scss']
})
export class CompanyShowComponent implements OnInit {

  public company: Company;
  public companyId: number;

  constructor(public companyService: CompanyService) {
    this.companyId = 1;
  }

  ngOnInit() {
    this.getCompany();
  }

  public getCompany() {

    this.companyService.get(this.companyId)
      .then((response) => {
        this.company = response.company;
      })
      .catch((err) => {
        console.log('Notify error');
      });
  }

}
