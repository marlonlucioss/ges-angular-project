import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '@auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  /**
   * Method to do login
   * @param userData
   */

  public login(data) {
    // Send the request to login
    return this.http.post( this.apiUrl, data).toPromise()
      .then((success) => {
        this.auth.addUserSession(success);
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public logout() {
    // Send the request to logout
    return this.http.delete( this.apiUrl + 'logout/' + this.auth.getToken()).toPromise()
      .then((success) => {
        this.auth.removeUser();
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public add(userData) {
    // Send the request to add a new user
    return this.http.post( this.apiUrl + 'user/add', userData).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public remove(id) {
    // Send the request to remove an user
    return this.http.put( this.apiUrl + 'user/remove', id).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public fetch() {
    // Send the request to get the user list
    return this.http.get( this.apiUrl + 'user/list').toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public edit(data) {
    // Send the request to edit user
    return this.http.put( this.apiUrl + 'user/edit', data).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to get an user
   */
  public get(id) {
    // Send the request to edit user
    return this.http.get( this.apiUrl + 'user/' + id).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do logout
   */
  public changeStatus(id, status) {
    // Send the request to edit user
    return this.http.post( this.apiUrl + 'user/change-status', { body: { id: id, status: status } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

}
