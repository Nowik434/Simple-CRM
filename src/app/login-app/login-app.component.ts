import { User } from './../services/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.css']
})
export class LoginAppComponent implements OnInit {

  user: User;
  isLoginMode = true;

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
      this.authService.SignUp(this.LoginForm.value.email, this.LoginForm.value.password)
      this.LoginForm.reset();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }



}
