import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Company } from '@company/company';
import { CompanyService } from '@company/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  constructor(public companyService: CompanyService) { }

  @Input() action: string;

  public company: Company;

  ngOnInit() {
    switch (this.action) {
      case 'add':
        this.company = new Company();
        break;
    }
  }

  public submit(form: NgForm) {

    this.company = form.value;

    switch (this.action) {
      case 'edit':
        this.companyService.edit(this.company)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Notify error');
          });
        break;
      case 'add':
        this.companyService.add(this.company)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log('Notify error');
          });
        break;
    }
  }
}
