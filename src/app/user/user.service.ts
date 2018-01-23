import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {

  constructor(public http: HttpClient, public auth: AuthService) { }

  /**
   * Method to do login
   * @param userData
   */

  public login(data) {
    // Send the request to login
    return this.http.post('http://www.mocky.io/v2/5a6206ca310000fa24de7e85', data).toPromise()
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
    return this.http.delete('http://www.mocky.io/v2/5a6206ca310000fa24de7e85' + '/' + this.auth.getCurrentUser()).toPromise()
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
    return this.http.post('/user/add', userData).toPromise()
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
    return this.http.put('/user/remove', id).toPromise()
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
    return this.http.get('/user/list').toPromise()
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
    return this.http.put('/user/edit', data).toPromise()
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
    return this.http.get('/user/' + id).toPromise()
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
    return this.http.post('/user/change-status', { body: { id: id, status: status } }).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

}
