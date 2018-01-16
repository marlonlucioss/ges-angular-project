import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getToken() {
    return 'foo';
  }
  constructor() { }

}
