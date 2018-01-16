import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Constant to store a request copy updating the headers object with the auth token into Authorization attribute
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)});

    // Send the newly created request
    return next.handle(authReq).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }
}
