import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() error: string | null | undefined;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
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

  onSubmit() {

    this.submitted = true;

    if (this.form.invalid) {
      console.log("invalid");
      return;
    }

    this.authService.register(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('user registered');
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error => {
          console.log('user not registered');
        });
  }

}
