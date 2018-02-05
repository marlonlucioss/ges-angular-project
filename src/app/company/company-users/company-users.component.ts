import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '@company/company.service';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { User } from '@user/user-models/user';
import { ActivatedRoute } from '@angular/router';
import { CompanyEnumerator } from '@company/company.enumerator';

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

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.companyService.companyOwnerLoaded.subscribe(
      (owner) => {
        this.user = new User();
        this.user.serialize(owner);
      }
    );
  }

  public addOwnerToCompany() {
    let companyId = null;
    this.route.params.subscribe(params => {
      companyId = params['id'];
    });
    this.companyService.addOwnerToCompany(this.userFound, CompanyEnumerator.COMPANY_OWNER_USER_PROFILE_ID)
      .then(() => {
        console.log('Notify owner added');
      });
  }

  public submit() {
    this.userService.searchByCPF(this.userCpf)
      .then((response) => {
        this.userFound.serialize(response.user);
      }).catch((response) => {
        console.log(response);
      });
  }

}
