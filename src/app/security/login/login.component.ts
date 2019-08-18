import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  private loginForm: FormGroup;
  private returnUrl: string;

  ngOnInit(): void {  
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    
    this.authService.logout(this.returnUrl);
  }

  getErrorMessage() {
    return this.loginForm.controls['email'].hasError('required') ? 'email é requerido' :
    this.loginForm.controls['email'].hasError('email') ? 'email não válido' : '';
  }
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService) { }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(user => {
          this.router.navigateByUrl(this.returnUrl);
        });
    }
  }

  isValidForm(){
    if (this.loginForm.valid)
      return true;

    return false;
  }
}
