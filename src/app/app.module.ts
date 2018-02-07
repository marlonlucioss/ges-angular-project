import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoleGuardService } from '@auth/role-guard.service';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './exceptions/page-not-found/page-not-found.component';

import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { CompanyService } from '@company/company.service';

import { AppHttpInterceptor } from './app-http-interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatTooltipModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatProgressBarModule } from '@angular/material';


import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { CompanyNavComponent } from './company/company-nav/company-nav.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';
import { PageNotPermittedComponent } from './exceptions/page-not-permitted/page-not-permitted.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translactions/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotPermittedComponent,
    PageNotFoundComponent,
    DashboardPageComponent,
    UserLoginComponent,
    UserLogoutComponent,
    UserNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    CompanyModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    UserService,
    CompanyService,
    RoleGuardService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
