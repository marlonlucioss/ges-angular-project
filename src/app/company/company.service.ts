import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '@user/user-models/user';

@Injectable()
export class CompanyService {

  private apiUrl = environment.apiUrl;
  public companyUsersProfiles = [];
  public companyUsers = [];
  companyUsersLoaded: EventEmitter<any> = new EventEmitter();
  companyUsersProfilesLoaded: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private formatCompanyAddress(data) {
    const companyData = Object.assign({}, data);
    companyData.address.city_id = Number.parseFloat(companyData.address.city_id);
    companyData.address.state_id =  Number.parseFloat(companyData.address.state_id);
    companyData['company_address_attributes'] = companyData.address;
    delete companyData.address;
    return companyData;
  }

  public getCompanyUsersProfiles() {
    return this.companyUsersProfiles;
  }

  public setCompanyUsersProfiles(data) {
    this.companyUsersProfiles = data;
    this.companyUsersProfilesLoaded.emit(this.companyUsersProfiles);
  }

  public getCompanyUsers() {
    return this.companyUsers;
  }

  public setCompanyUsers(data) {
    this.companyUsers = data;
    this.companyUsersLoaded.emit(this.companyUsers);
  }

  /**
   * Method to create a company
   * @param data
   */
  public add(data) {
    // Send the request to add a new user
    return this.http.post( this.apiUrl + '/companies', { company: this.formatCompanyAddress(data) }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do remove a company
   * @param id
   */
  public remove(id) {
    // Send the request to remove an user
    return this.http.put( this.apiUrl + 'company/remove', { body: { id: id } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to fetch all companies
   */
  public fetch() {
    // Send the request to get the user list
    return this.http.get( this.apiUrl + '/companies').toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to edit a company
   * @param data
   */
  public edit(data) {
    // Send the request to edit user
    const profileObj = this.companyUsersProfiles.find(function (profileObj) {
      return profileObj.profile_id === 1;
    });
    const userObj = this.companyUsers.find(function (userObj) {
      return userObj.id === profileObj.user_id;
    });

    data.users_companies_attributes = this.getCompanyUsersProfiles();

    data.cpf_owner = (!data.cpf_owner && this.companyUsersProfiles.length > 0) ? userObj.user_info_attributes.cpf : null;

    return this.http.put( this.apiUrl + '/companies/' + data.id, { company: this.formatCompanyAddress(data) }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to retrieve just one company data from server
   * @param id
   */
  public get(id) {
    // Send the request to edit user
    return this.http.get( this.apiUrl + '/companies/' + id).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to change the status of a company
   * @param id
   * @param status
   */
  public changeStatus(id, status) {
    // Send the request to edit user
    return this.http.post( this.apiUrl + 'company/change-status', { body: { id: id, status: status } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  public addUserToCompany(user: User, profileId, companyId ) {

    const obj = this.companyUsersProfiles.find(function (obj) {
      return obj.user_id === user.id;
    });

    if (!obj) {
      this.companyUsersProfiles.push({
        user_id : user.id,
        profile_id : profileId,
        company_id : companyId
      });
      this.companyUsers.push(user);
      this.companyUsersLoaded.emit(this.companyUsers);
      this.companyUsersProfilesLoaded.emit(this.companyUsersProfiles);
    }

    return new Promise((resolve) => {
      resolve('user added');
    });

  }

}
