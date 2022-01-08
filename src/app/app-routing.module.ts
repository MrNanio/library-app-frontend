import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BookComponent} from "./book/book.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: 'overview', component: AccountOverviewComponent },
      // { path: 'products', component: AccountProductsComponent },
      // { path: 'exercises', component: AccountExercisesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
