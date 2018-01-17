import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';

import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

import { AppHttpInterceptor } from './app-http-interceptor';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { UserLoginComponent } from './user/user-login/user-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UserLogoutComponent,
    UserLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule
  ],
  providers: [
    AuthService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
