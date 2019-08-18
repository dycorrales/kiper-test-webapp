import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthorizationCheck implements CanActivate {

    constructor(private authService: AuthenticationService, private toastr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isTokenExpired()) {
            return true;
          }
          
          this.toastr.error('Sua sessão expirou', 'Erro!');
          this.authService.logout({ queryParams: { returnUrl: state.url } });
          return false;
    }
}
