import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { AppRoutingModule, routes } from './app.routing';
import { SharedModule } from './components/shared.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicationErrorHandler } from 'app/app.error-handling';
import { registerLocaleData, DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthorizationCheck } from './security/auth-check.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { httpInterceptor } from './services/http-interceptor.service';
import { LoginComponent } from './security/login/login.component';
import { MatTooltipModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatRippleModule, MatButtonModule } from '@angular/material';
import { AuthenticationService } from './security/auth.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ApartmentService } from './modules/apartments/apartment.service';
import { CondominiumService } from './modules/condominiums/condominium.service';
import localePt from '@angular/common/locales/pt';
import { ResidentService } from './modules/residents/resident.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ApartmentFormComponent } from './modules/apartments/apartment-form/apartment-form.component';

registerLocaleData(localePt);

@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [{ provide: ErrorHandler, useClass: ApplicationErrorHandler },
    DashboardService,
    ApartmentService,
    CondominiumService,
    ResidentService,
    ErrorInterceptor,
    DatePipe,
  { provide: LOCALE_ID, useValue: 'pt-BR' },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: httpInterceptor,
    multi: true
  },
    ToastrService,
    AuthenticationService,
    AuthorizationCheck
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
