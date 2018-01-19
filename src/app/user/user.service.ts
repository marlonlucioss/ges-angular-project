import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {

  constructor(public http: HttpClient, public auth: AuthService) { }

  /**
   * Method to do login
   * @param userData
   */

  public login(userData) {
    // Send the request to login
    return this.http.post('http://www.mocky.io/v2/5a6206ca310000fa24de7e85', userData).toPromise()
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
    this.http.post('/user/add', userData).subscribe(
      success => {
        // Return the new user object
        return success;
      },
      error => {
        console.log('Not Completed');
        console.log(error);
      }
    );
  }

  /**
   * Method to do logout
   */
  public remove(id) {
    // Send the request to remove an user
    this.http.put('/user/remove', id).subscribe(
      success => {
        // Remove request object
        return success;
      },
      error => {
        console.log('Not Completed');
        console.log(error);
      }
    );
  }

  /**
   * Method to do logout
   */
  public fetch() {
    // Send the request to get the user list
    this.http.get('/user/list').subscribe(
      success => {
        // Return the success object
        return success;
      },
      error => {
        console.log('Not Completed');
        console.log(error);
      }
    );
  }

  /**
   * Method to do logout
   */
  public edit(userData) {
    // Send the request to edit user
    this.http.put('/user/edit', userData).subscribe(
      success => {
        // Return the success object
        return success;
      },
      error => {
        console.log('Not Completed');
        console.log(error);
      }
    );
  }

}
