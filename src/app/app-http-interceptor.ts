import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Constant to store a request copy updating the headers object with the auth token into Authorization attribute
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)});

    // Send the newly created request
    return next.handle(authReq).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }
}
