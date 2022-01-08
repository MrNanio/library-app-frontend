import {Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Jwt} from "../model/jwt";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
// BehaviorSubject: special type of observable, which needs initial value, because it must always return a value on subscription
  // after subscription, returns the last value of the subject
  // getValue()to get last value in non-observable code
  private jwtSubject: BehaviorSubject<Jwt>;

  public jwt: Observable<Jwt>;

  constructor(private router: Router, private http: HttpClient) {
    this.jwtSubject = new BehaviorSubject<Jwt>(
      JSON.parse(<string>localStorage.getItem('jwt'))
    ); // necessity of initialization the BehaviourSubject
    // get an observable from BehaviourSubject
    // to prevent nexting values into to the subject
    // now can only listening, can't emit
    this.jwt = this.jwtSubject.asObservable();

  }

  public get jwtValue(): Jwt {
    // returning last value
    return this.jwtSubject.value;
  }

  login(email: string, password: string): Observable<Jwt> {
    return this.http
      .post<any>(`${environment.API_URL}/auth/login`, {email, password})
      .pipe(
        map(userData => {
          localStorage.setItem('jwt', JSON.stringify(userData));
          this.jwtSubject.next(userData);
          return userData;
        })
      );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/register`, {
      email,
      password
    });
  }

  logout(): void {
    // remove jwt from local storage
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
