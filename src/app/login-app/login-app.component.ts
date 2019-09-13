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
      this.authService.login(this.LoginForm.value.email, this.LoginForm.value.password).catch(error => {
        console.log(error)
        let errorCode = error.code;
        switch(errorCode) {
          case 'auth/user-not-found':
            this.errorMessage = 'Nie znaleziono użytkownika';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Nieprawidłowe hasło';
            break;
        }
        console.log(errorCode);
      });
      this.LoginForm.reset();
    } else {
      console.log('Register Mode');
      this.authService.signUp(this.LoginForm.value.email, this.LoginForm.value.password).catch(error => {
        console.log(error);
        let errorCode = error.code;
        switch(errorCode) {
          case 'auth/user-not-found':
            this.errorMessage = 'Nie znaleziono użytkownika';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Nieprawidłowe hasło';
            break;
          case 'auth/email-already-in-use':
            this.errorMessage = 'Użytkownik już istnieje';
            break;
        }
        console.log(errorCode);
      });
      this.LoginForm.reset();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }



}
