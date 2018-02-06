import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '@auth/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, public router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getUserToken() || '';
    const email = this.auth.getUserEmail() || '';

    // Constant to store a request copy updating the headers object with the auth token into Authorization attribute
    const authReq = req.clone({
      setHeaders: {
        'X-USER-EMAIL': email,
        'X-USER-TOKEN': token
      }
    });

    // Send the newly created request
    return next.handle(authReq).catch((error) => {
      if (error.status === 401) {
        this.auth.removeUser();
        this.router.navigateByUrl('/login');
      }
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }
}
