import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
=======
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule  } from '@angular/material';
>>>>>>> feature/ui-settings

import { AppComponent } from './app.component';
import { NotFoundComponent } from './exceptions/not-found/not-found.component';

import { AuthService } from './auth/auth.service';

import { AppHttpInterceptor } from './app-http-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
=======
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule
>>>>>>> feature/ui-settings
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
