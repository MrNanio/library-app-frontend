
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {AuthService} from "../service/auth.service";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // get jwt
    const jwt = this.authService.jwtValue;
    // check if user is already logged in
    const isLoggedIn = jwt && jwt.jwtToken;
    // check if url is correct
    const isApiUrl = request.url.startsWith(environment.API_URL);
    // if user is logged in and api url is correct
    // -> clone the request before sending to the server and add authorization header
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt.jwtToken}`,
        },
      });
    }

    // pass the modified request object
    return next.handle(request);
  }
}
