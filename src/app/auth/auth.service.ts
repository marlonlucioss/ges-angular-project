import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isTest: boolean = false;
  public getToken() {
    return 'foo';
  }
  
  constructor() { }

}
