import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getToken(): string {
    return 'token';
    // return localStorage.getItem('token');
  }
  constructor() { }

}
