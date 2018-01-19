import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if ( !this.auth.isLogged() ) {
    //   this.router.navigateByUrl('/login');
    //   return Observable.throw(Error);
    // }
    const token = this.auth.getToken() || 'foo';

    // Constant to store a request copy updating the headers object with the auth token into Authorization attribute
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)});

    // Send the newly created request
    return next.handle(authReq).catch((error) => {
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }
}
