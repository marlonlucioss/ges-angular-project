import { Component, OnInit } from '@angular/core';
import { CompanyService } from '@company/company.service';
import { UserService } from '@user/user.service';
import { AppService } from '@app/app.service';
import { User } from '@user/user-models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss']
})
export class CompanyUsersComponent implements OnInit {

  public userCpf: string;
  public user: User = new User();
  public profiles = [];
  public companyUsers;
  public companyUsersProfiles;



  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private appService: AppService,
    private route: ActivatedRoute) {
    this.companyUsers = this.companyService.companyUsers;
  }

  ngOnInit() {
    this.companyService.companyUsersLoaded.subscribe(
      (users) => {
        this.companyUsers = users;
      }
    );
    this.companyService.companyUsersProfilesLoaded.subscribe(
      (usersProfiles) => {
        this.companyUsersProfiles = usersProfiles;
      }
    );
    this.appService.getProfiles()
      .then((response) => {
         this.profiles = response.profiles;
      });
  }

  public addUserToCompany() {
    const profileId = <HTMLInputElement>document.getElementById('user-profile');
    let companyId = null;
    this.route.params.subscribe(params => {
      companyId = params['id'];
    });
    this.companyService.addUserToCompany(this.user, parseFloat(profileId.value), parseFloat(companyId))
      .then(() => {
        this.userCpf = null;
        this.user = new User();
      });
  }

  public submit() {
    this.userService.searchByCPF(this.userCpf)
      .then((response) => {
        this.user.serialize(response.user);
      }).catch((response) => {
        console.log(response);
      });
  }

}
