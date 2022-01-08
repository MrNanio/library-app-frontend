import {AuthService} from "../service/auth.service";
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  invalidLogin = false

  @Input() error: string | null | undefined;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  checkLogin() {
    (this.authService.login(this.email, this.password).subscribe(
        data => {
          this.router.navigate(['book'])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
          this.error = error.message;
        }
      )
    );
  }
}
