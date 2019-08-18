import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../security/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, 
        private state: RouterStateSnapshot) { }

    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {

        return newRequest.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                //if 401 response returned from api, logout from application & redirect to login page.
                this.authenticationService.logout({ queryParams: { returnUrl: this.state.url } });
            }

            const error = err.error.message || err.statusText;
            
            return Observable.throw(error);
        }));
    }
}
