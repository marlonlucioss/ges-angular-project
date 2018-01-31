import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth/auth.service';
import { environment } from '@env/environment';

@Injectable()
export class AppService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Method to do login
   * @param userData
   */
  public getCities(stateId) {
    // Send the request to login
    return this.http.get( this.apiUrl + '/cities?state_id=' + stateId).toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * Method to do login
   * @param userData
   */
  public getStates() {
    // Send the request to login
    return this.http.get( this.apiUrl + '/states').toPromise()
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
  public getProfiles() {
    // Send the request to edit user
    return this.http.get( this.apiUrl + '/profiles').toPromise()
      .then((success) => {
        return success;
      })
      .catch((err) => {
        return err;
      });
  }

}
