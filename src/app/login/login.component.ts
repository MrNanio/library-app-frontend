import {AuthService} from "../service/auth.service";
import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  @Input() error: string | null | undefined;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  checkLogin() {

    this.submitted = true;

    if (this.form.invalid) {
      console.log("invalid");
      return;
    }

    (this.authService.login(this.f['email'].value, this.f['password'].value).subscribe(
        data => {
          this.router.navigate(['book'])
        },
        error => {
          this.error = error.message;
        }
      )
    );
  }
}
