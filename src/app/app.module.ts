import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookComponent} from './book/book.component';
import {HeaderComponent} from './header/header.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookUpdateComponent} from './book-update/book-update.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {BasicAuthInterceptor} from "./auth/basic-auth.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {BookListComponent} from './book-list/book-list.component';
import {FooterComponent} from './footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BookComponent,
    HeaderComponent,
    BookDetailsComponent,
    BookUpdateComponent,
    BookCreateComponent,
    BookListComponent,
    FooterComponent
  ],
  imports: [
    MatTableModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
