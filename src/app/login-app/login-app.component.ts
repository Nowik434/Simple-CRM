import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { User } from './../services/user';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  user: User;
  isLoginMode = true;
  errorMessage: string;

  constructor(private authService: AuthService, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        console.log(user);
        localStorage.setItem('user', null);
      }
    });
   }

  LoginForm = new FormGroup({
    email: new FormControl(this.LoginForm, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(this.LoginForm, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });


  ngOnInit() {

  }

  onSubmit() {
    if(this.isLoginMode) {
      console.log('Login Mode');
      this.authService.SignIn(this.LoginForm.value.email, this.LoginForm.value.password)
      this.LoginForm.reset();
    } else {
      console.log('Register Mode');
      this.authService.SignUp(this.LoginForm.value.email, this.LoginForm.value.password).subscribe(
        UserData => {
          console.log(UserData);
        },
        error => {
          console.log(error.error.error.message);
          switch(error.error.error.message) {
            case 'INVALID_EMAIL':
              this.errorMessage = 'Nieprawidłowy adres email';
              break;
            case 'EMAIL_EXISTS':
              this.errorMessage = 'Podany adres już istnieje';
              break;
            case 'OPERATION_NOT_ALLOWED':
              this.errorMessage = 'fdsfdsfds';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              this.errorMessage = 'Sprobuj pozniej';
              break;
          }
        }
      )
      this.LoginForm.reset();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }



}
