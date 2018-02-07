import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '@company/company.service';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { User } from '@user/user-models/user';
import { CompanyEnumerator } from '@company/company.enumerator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss']
})
export class CompanyUsersComponent implements OnInit {

  public userCpf: string;
  public user: User;
  public userFound: User = new User();

@Input() action: string;

constructor( private userService: UserService, private companyService: CompanyService, public notify: MatSnackBar,
             private translate: TranslateService) {}

  ngOnInit() {
    this.companyService.companyOwnerLoaded.subscribe(
      (owner) => {
        this.user = new User();
        this.user.serialize(owner);
      }
    );

  }

  public addOwnerToCompany() {
    this.companyService.addOwnerToCompany(this.userFound, CompanyEnumerator.COMPANY_OWNER_USER_PROFILE_ID)
      .then(() => {
        this.translate.get(['COMPANY.USERS.ADD_OWNER_SUCCESS']).subscribe(res => {
          this.notify.open(res['COMPANY.USERS.ADD_OWNER_SUCCESS'], 'ok', {
            duration: 2000
          });
        });
      });
  }

  public submit() {
    this.userService.searchByCPF(this.userCpf)
      .then((response) => {
        if (response['users'][0].length < 1) {
          this.translate.get(['COMPANY.USERS.ADD_USER_SEARCH_NOT_FOUND']).subscribe(res => {
            this.notify.open(res['COMPANY.USERS.ADD_USER_SEARCH_NOT_FOUND'], 'ok', {
              duration: 2000
            });
          });
          return;
        }
        this.userFound.serialize(response['users'][0]);
      })
      .catch((response) => {
        console.log(response);
        this.translate.get(['COMPANY.USERS.ADD_OWNER_SUCCESS']).subscribe(res => {
          this.notify.open(res['COMPANY.USERS.ADD_OWNER_SUCCESS'], 'ok', {
            duration: 2000
          });
        });
      });
  }

  public removeOwner() {
    this.companyService.removeOwner(this.userFound)
      .then((response) => {
        this.userFound = new User();
        this.user = null;
        this.userCpf = null;
        this.translate.get(['COMPANY.USERS.REMOVE_OWNER_SUCCESS']).subscribe(res => {
          this.notify.open(res['COMPANY.USERS.REMOVE_OWNER_SUCCESS'], 'ok', {
            duration: 2000
          });
        });
      })
      .catch((error) => {
        console.log(error);
        this.translate.get(['COMPANY.USERS.REMOVE_OWNER_FAILURE']).subscribe(res => {
          this.notify.open(res['COMPANY.USERS.REMOVE_OWNER_FAILURE'], 'ok', {
            duration: 2000
          });
        });
      });
  }

}
