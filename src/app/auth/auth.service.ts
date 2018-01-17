import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public getToken() {
    const userObj = JSON.parse(localStorage.getItem('ges_user'));
    return userObj.token;
  }

  public removeUser() {
    localStorage.removeItem('ges_user');
  }

}
