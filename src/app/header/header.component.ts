import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {Jwt} from "../model/jwt";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: Jwt | undefined;

  constructor(
    private router: Router,
    private authenticationService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticationService.jwt.subscribe((x) => (this.currentUser = x));
  }

  public isActive(base: string): boolean {
    return this.router.url.includes(`/${base}`);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
