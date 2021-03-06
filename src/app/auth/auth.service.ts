import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  /**
   * Method to retrive only the user authentication token
   */
  public isLogged() {
    return localStorage.getItem('ges_user');
  }

  /**
   * Method to retrive only the user roles list
   */
  public getUserRoles() {
    const user = JSON.parse(localStorage.getItem('ges_user'));
    return user.roles;
  }

  /**
   * Method to retrive only the user authentication token
   */
  public getUserToken() {
    if (localStorage.getItem('ges_user')) {
      const session = JSON.parse(localStorage.getItem('ges_user'));
      return session.authentication_token;
    } else {
      return false;
    }
  }

  /**
   * Method to retrive only the user authentication token
   */
  public getUserEmail() {
    if (localStorage.getItem('ges_user')) {
      const session = JSON.parse(localStorage.getItem('ges_user'));
      return session.email;
    } else {
      return false;
    }
  }

  /**
   * Method remove the user object from local storage
   */
  public removeUser() {
    localStorage.removeItem('ges_user');
  }

  /**
   * Method to store the user object in the local storage
   * @param data
   */
  public addUserSession(data) {
    localStorage.setItem('ges_user', JSON.stringify(data.user));
  }

  /**
   * Method return the current user
   * @returns {any}
   */
  public getCurrentUser() {
    /**
     * Gets the user object from local storage
     * and converts it to a valid JSON to build the
     * user object with only usefull information
     */
    const session = JSON.parse(localStorage.getItem('ges_user'));
    return session;
  }

}
