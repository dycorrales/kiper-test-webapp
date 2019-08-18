import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/auth.service';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header to request
        //Get Token data from local storage
        let tokenInfo = JSON.parse(localStorage.getItem('KiperCondominioToken'));

        if (tokenInfo && tokenInfo.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${tokenInfo.access_token}`,
                    'Content-Type': 'application/json'
                }
            });}
        else {
            this.authenticationService.logout(null);
        }
        return newRequest.handle(request);
    }
}