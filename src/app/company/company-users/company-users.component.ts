import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '@company/company.service';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { User } from '@user/user-models/user';
import { CompanyEnumerator } from '@company/company.enumerator';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor( private userService: UserService, private companyService: CompanyService, public notify: MatSnackBar) {}

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
        this.notify.open('Owner added', 'ok', {
          duration: 1000
        });
      });
  }

  public submit() {
    this.userService.searchByCPF(this.userCpf)
      .then((response) => {
        this.userFound.serialize(response.users[0]);
      })
      .catch((response) => {
        this.notify.open('User not found', 'ok', {
          duration: 1000
        });
      });
  }

  public removeOwner() {
    this.companyService.removeOwner(this.userFound)
      .then((response) => {
        this.userFound = new User();
        this.user = null;
        this.userCpf = null;
        this.notify.open('Owner removed', 'ok', {
          duration: 1000
        });
      })
      .catch((error) => {
        console.log(error);
        this.notify.open('Error occurred', 'ok', {
          duration: 1000
        });
      });
  }

}
