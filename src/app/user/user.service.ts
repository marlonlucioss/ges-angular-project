import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '@auth/auth.service';
import { environment } from '@env/environment';

@Injectable()
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private notify: MatSnackBar) { }

  private formatData(body) {
    return { user: body };
  }

  /**
   * Method to do login
   * @param userData
   */

  public login(data) {
    // Send the request to login
    return this.http.post( this.apiUrl + '/users/sign_in', this.formatData(data)).toPromise()
      .then((response) => {
        this.auth.addUserSession(response);
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public logout() {
    // Send the request to logout
    return this.http.delete( this.apiUrl + '/users/sign_out').toPromise()
      .then((response) => {
        this.auth.removeUser();
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public add(data) {
    // Send the request to add a new user
    return this.http.post( this.apiUrl + '/users', this.formatData(data)).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public remove(id) {
    // Send the request to remove an user
    return this.http.delete( this.apiUrl + '/users?user_id=' + id).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public fetch() {
    // Send the request to get the user list
    return this.http.get( this.apiUrl + '/users').toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public edit(data) {
    // Send the request to edit user
    return this.http.put( this.apiUrl + `/users/${data.id}`, data).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to get an user
   */
  public get(id) {
    // Send the request to edit user
    return this.http.get( this.apiUrl + '/users/' + id).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to get an user by cpf
   */
  public searchByCPF(cpf: string) {
    // Send the request to edit user
    return this.http.get( this.apiUrl + '/users?q[user_info_cpf_eq]=' + cpf ).toPromise()
    // return this.http.get( this.apiUrl + '/users/search_by?cpf=' + cpf ).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   * Method to do logout
   */
  public changeStatus(id, status) {
    // Send the request to edit user
    return this.http.post( this.apiUrl + 'user/change-status', { body: { id: id, status: status } }).toPromise()
      .then((response) => {
        return response;
      });
  }

  /**
   *
   * @param {String} msg
   * @param {Integer} time
   */
  notifyAuthError(msg, time) {
    this.notify.open(msg, 'ok', {
      duration: time
    });
  }

}
