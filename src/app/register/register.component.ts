import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = ''
  password = ''

  @Input() error: string | null | undefined;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.email, this.password)
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
