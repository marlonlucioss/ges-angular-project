import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {

  constructor(public http: HttpRequest, public auth: AuthService) { }

  /**
   * Method to do logout
   */
  public login(userData) {
    // Send the request to logout
    this.http.post('/login', data).subscribe(
      success => {
        // Remove the user from the local session
        this.auth.addUserSession(data);
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
    this.http.get('/logout').subscribe(
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

}
