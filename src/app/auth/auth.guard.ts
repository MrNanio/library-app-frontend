import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {AuthService} from "../service/auth.service";


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // CanActivate decides if route can be activated
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // get jwt
    const jwt = this.authService.jwtValue;
    // if jwt exists -> activate
    if (jwt) {
      return true;
    }

    // else -> redirect to sign in form

    this.router.navigate(['login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
