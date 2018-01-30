import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const routerRoles = route.data.roles;

    const userRoles = this.auth.getUserRoles() || [];

    console.log(routerRoles);
    console.log(userRoles);

    let canAccess = false;

    for (let i = 0; i < userRoles.length; i++) {
      if (routerRoles.indexOf(userRoles[i] !== -1)) {
        canAccess = true;
      }
    }

    if (!canAccess) {
      this.router.navigateByUrl('/not-permitted');
    }
    return canAccess;
  }

}
