import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '@company/company-models/company';
import { CompanyService } from '@company/company.service';
import { AppService } from '@app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router) { }

  @Input() action: string;

  public company: Company;
  public owner;
  public states = [];
  public cities = [];

  changeState(stateId) {
    this.appService.getCities(stateId)
      .then((response) => {
        this.cities = response.cities;
      });
  }

  ngOnInit() {

    this.companyService.companyOwnerLoaded.subscribe(
      (owner) => {
        console.log(owner);
        this.owner = owner;
        this.company.setCpfOwner(owner.name);
      }
    );

    this.appService.getStates()
      .then((response) => {
        this.states = response.states;
      });

    switch (this.action) {
      case 'add':
        this.company = new Company();
        break;
      case 'edit':
        this.company = new Company();
        this.route.params.subscribe(params => {
          this.companyService.get(params['id'])
            .then((response) => {
              this.companyService.setCompanyUsers(response.company.users);
              this.companyService.setCompanyUsersProfiles(response.company.users_companies);
              this.company.serialize(response.company);
              this.changeState(response.company.company_address.state_id);
              this.company.cpf_owner = this.owner.name;
            }).catch((error) => {
              console.log(error);
            });
        });
        break;
    }
  }

  public submit(form: NgForm) {

    console.log(form);

    if (!form.valid) {
      for (const field of Object.keys(form.controls)) {
        form.controls[field].markAsTouched();
      }
      return;
    }

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
            this.router.navigateByUrl('/company/edit/' + response.company.id );
          })
          .catch((err) => {
            console.log('Notify error');
          });
        break;
    }
  }
}
