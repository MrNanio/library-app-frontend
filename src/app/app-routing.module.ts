import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BookComponent} from "./book/book.component";
import {AuthGuard} from "./auth/auth.guard";
import {BookCreateComponent} from "./book-create/book-create.component";
import {BookListComponent} from "./book-list/book-list.component";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {BookUpdateComponent} from "./book-update/book-update.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: BookListComponent},
      {path: 'create', component: BookCreateComponent},
      {path: 'book-details/:id', component: BookDetailsComponent},
      {path: 'book-update/:id', component: BookUpdateComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
