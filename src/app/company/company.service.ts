import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '@user/user-models/user';
import { CompanyEnumerator } from '@company/company.enumerator';

@Injectable()
export class CompanyService {

  private apiUrl = environment.apiUrl;
  public companyUsersProfiles = [];
  public companyUsers = [];
  public currentCompanyOwner;
  public companyUsersLoaded: EventEmitter<any> = new EventEmitter();
  public companyUsersProfilesLoaded: EventEmitter<any> = new EventEmitter();
  public companyOwnerLoaded: EventEmitter<any> = new EventEmitter();
  public companyOwnerRemoved: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  private formatCompanyAddress(data) {
    const companyData = Object.assign({}, data);
    companyData.address.city_id = Number.parseFloat(companyData.address.city_id);
    companyData.address.state_id =  Number.parseFloat(companyData.address.state_id);
    companyData['company_address_attributes'] = companyData.address;
    companyData['users_companies_attributes'] = this.getCompanyUsersProfiles();
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

  public fillCompanyOwner() {
    const profileAdmin = this.companyUsersProfiles.find(function (obj) {
      return obj.profile_id === CompanyEnumerator.COMPANY_OWNER_USER_PROFILE_ID;
    });
    const companyOwner = this.companyUsers.find(function (obj) {
      return obj.id === profileAdmin.user_id;
    });
    this.companyOwnerLoaded.emit(companyOwner);
    this.currentCompanyOwner = companyOwner;
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
   * Method to edit a company
   * @param data
   */
  public edit(data) {
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

  public addOwnerToCompany(user: User, profileId) {

    this.companyUsersProfiles.push({
      user_id : user.id,
      profile_id : profileId
    });

    this.companyUsers.push(user);
    this.companyUsersLoaded.emit(this.companyUsers);
    this.companyUsersProfilesLoaded.emit(this.companyUsersProfiles);
    this.companyOwnerLoaded.emit(user);
    this.currentCompanyOwner = user;

    return new Promise((resolve) => {
      resolve('user added');
    });

  }

  public removeOwner(user: User) {
    try {
      const userProfileIndex = this.companyUsersProfiles.findIndex(obj => obj.user_id === user.id);
      const userIndex = this.companyUsers.findIndex(obj => obj.id === user.id);
      this.companyUsersProfiles.splice(userProfileIndex, 1);
      this.companyUsers.splice(userIndex, 1);
      this.companyUsersLoaded.emit(this.companyUsers);
      this.companyUsersProfilesLoaded.emit(this.companyUsersProfiles);
      this.companyOwnerRemoved.emit();
      return new Promise((resolve) => {
        resolve('user removed');
      });
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject('problem to remove');
      });
    }
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
