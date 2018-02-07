import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators} from '@angular/forms';
import { Company } from '@company/company-models/company';
import { CompanyService } from '@company/company.service';
import { AppService } from '@app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { patternValidator } from '@app/directives/form/input-pattern-validator.directive';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    public notify: MatSnackBar,
    private translate: TranslateService) { }

  @Input() action: string;

  public company: Company;
  public companyForm: FormGroup;
  public owner;
  public states = [];
  public cities = [];

  changeState(stateId) {
    this.appService.getCities(stateId)
      .then((response) => {
        this.cities = response.cities;
      })
      .catch((response) => {
        this.translate.get(['COMPANY.FORM.GET_CITIES_FAILURE']).subscribe(res => {
          this.notify.open(res['COMPANY.FORM.GET_CITIES_FAILURE'], 'ok', {
            duration: 2000
          });
        });
        console.log(response);
      });
  }

  ngOnInit() {

    this.companyService.companyOwnerLoaded.subscribe(
      (owner) => {
        this.owner = owner;
        if (owner.user_info) {
          owner['user_info_attributes'] = owner.user_info;
        }
        this.company.setCpfOwner(owner.user_info_attributes.cpf);
      }
    );

    this.companyService.companyOwnerRemoved.subscribe(
      () => {
        this.owner = null;
        this.company.removeCpfOwner();
      }
    );

    this.appService.getStates()
      .then((response) => {
        this.states = response.states;
      })
      .catch((response) => {
        this.translate.get(['COMPANY.FORM.GET_STATES_FAILURE']).subscribe(res => {
          this.notify.open(res['COMPANY.FORM.GET_STATES_FAILURE'], 'ok', {
            duration: 2000
          });
        });
        console.log(response);
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
              this.companyService.setCompanyUsers(response['company'].users);
              this.companyService.setCompanyUsersProfiles(response['company'].users_companies);
              this.companyService.fillCompanyOwner();
              this.company.serialize(response['company']);
              this.changeState(response['company'].company_address.state_id);
            }).catch((error) => {
              this.translate.get(['COMPANY.FORM.GET_COMPANY_FAILURE']).subscribe(res => {
                this.notify.open(res['COMPANY.FORM.GET_COMPANY_FAILURE'], 'ok', {
                  duration: 2000
                });
              });
              console.log(error);
            });
        });
        break;
    }

    this.companyForm = new FormGroup({
      name: new FormControl(this.company.name, [Validators.required]),
      cnpj: new FormControl(this.company.cnpj, [Validators.required]),
      phone: new FormControl(this.company.phone, [Validators.required]),
      state_id: new FormControl(this.company.address.state_id, [Validators.required]),
      city_id: new FormControl(this.company.address.city_id, [Validators.required]),
      postal_code: new FormControl(this.company.address.postal_code, [Validators.required]),
      neighborhood: new FormControl(this.company.address.neighborhood, [Validators.required]),
      number: new FormControl(this.company.address.number, [Validators.required]),
      complement: new FormControl(this.company.address.complement, [Validators.required]),
      street: new FormControl(this.company.address.street, [Validators.required]),
      cpf_owner: new FormControl(this.company.cpf_owner, [Validators.required]),
      email: new FormControl(this.company.email, [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])
    });

  }

  public submit(form: NgForm) {

    if (!form.valid) {
      for (const field of Object.keys(form.controls)) {
        form.controls[field].markAsTouched();
      }
      this.translate.get(['COMPANY.FORM.FILL_REQUIRED_FIELDS_VALIDATION']).subscribe(res => {
        this.notify.open(res['COMPANY.FORM.FILL_REQUIRED_FIELDS_VALIDATION'], 'ok', {
          duration: 2000
        });
      });
      return;
    }
    if (!form.controls.cpf_owner.value) {
      this.translate.get(['COMPANY.FORM.FILL_REQUIRED_OWNER_VALIDATION']).subscribe(res => {
        this.notify.open(res['COMPANY.FORM.FILL_REQUIRED_OWNER_VALIDATION'], 'ok', {
          duration: 2000
        });
      });
      return;
    }

    switch (this.action) {
      case 'edit':
        this.companyService.edit(this.company)
          .then((response) => {
            this.translate.get(['COMPANY.FORM.COMPANY_EDIT_SUCCESS']).subscribe(res => {
              this.notify.open(res['COMPANY.FORM.COMPANY_EDIT_SUCCESS'], 'ok', {
                duration: 2000
              });
            });
          })
          .catch((err) => {
            this.translate.get(['COMPANY.FORM.COMPANY_EDIT_FAILURE']).subscribe(res => {
              this.notify.open(res['COMPANY.FORM.COMPANY_EDIT_FAILURE'], 'ok', {
                duration: 2000
              });
            });
            console.log(err);
          });
        break;
      case 'add':
        this.companyService.add(this.company)
          .then((response) => {
            this.translate.get(['COMPANY.FORM.COMPANY_ADD_SUCCESS']).subscribe(res => {
              this.notify.open(res['COMPANY.FORM.COMPANY_ADD_SUCCESS'], 'ok', {
                duration: 2000
              });
            });
            this.router.navigateByUrl('/company/edit/' + response['company'].id );
          })
          .catch((err) => {
            this.translate.get(['COMPANY.FORM.COMPANY_ADD_FAILURE']).subscribe(res => {
              this.notify.open(res['COMPANY.FORM.COMPANY_ADD_FAILURE'], 'ok', {
                duration: 2000
              });
            });
            console.log(err);
          });
        break;
    }
  }
}
