import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {

  constructor(public http: HttpRequest, public auth: AuthService) { }

  /**
   * Method to do login
   * @param userData
   */
  public login(userData) {
    // Send the request to logout
    this.http.post('/user/login', userData).subscribe(
      success  => {
        // Remove the user from the local session
        this.auth.addUserSession(success);
        console.log('Successfully Completed');
        console.log(success);
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
  public logout() {
    // Send the request to logout
    this.http.delete('/user/logout').subscribe(
      success => {
        // Remove the user from the local session
        this.auth.removeUser();
        console.log('Successfully Completed');
        console.log(success);
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
