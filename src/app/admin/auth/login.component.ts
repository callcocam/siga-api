import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServicesService } from '../../services/shared-services.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  admin: boolean = false;
  redirectAfterLogin = ["/admin/dashboard"];
  constructor(
    private router: Router,
    private formBilder: FormBuilder,
    public sharedService: SharedServicesService,
    private authService: AuthService
  ) {}

  ngOnInit() {

    this.loginForm = this.formBilder.group({
      email: this.formBilder.control("", [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(this.sharedService.email)
      ]),
      password: this.formBilder.control("", [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  login(data) {
   
    this.authService.login(data).subscribe(
      response => {
        this.authService.check = true;
        this.authService.jwtToken.token = response.token;
        this.authService.localStorage.setObject(
          this.authService.USER_KEY,
          response.user
        );
        //this.router.navigate(["/admin/dashboard"])
        window.location.href = "/conect-app/admin/dashboard"
      },
      error => {
         console.log(error)
      });
 }
}
