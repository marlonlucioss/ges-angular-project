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
   * Method to retrive only the user authentication token
   */
  public getToken() {
    const userObj = JSON.parse( localStorage.getItem('ges_user') );
    return userObj.token;
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
    localStorage.setItem('ges_user', JSON.stringify(data));
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
    const sessionUser = JSON.parse(localStorage.getItem('ges_user'));
    return sessionUser.user;
  }

}
