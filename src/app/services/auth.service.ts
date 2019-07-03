import { User } from './user';
import { Injectable, NgZone  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  url = 'AIzaSyCyKphftMCyMzRtKSVjor1a0EI8Mmy4gWE';
  errorMessage = '';

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth ,
    public  router:  Router,
    public ngZone: NgZone,
    public http: HttpClient
  ) { }

// showError() {
//   return this.error;
// }

SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
          console.log(result);
        });
        this.SetUserData(result.user);
      }).catch((error) => {

        switch(error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Nieprawidłowy adres email';
            break;
          case 'auth/invalid-password':
            this.errorMessage = 'Nieprawidłowe hasło';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'Nie znaleziono użytkownika';
            break;
        }
        console.log(error.message)
        console.log(this.errorMessage)
      });
  }

// SignUp(email, password) {
//   return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
//   )
//   .catch((error) => {
//     // Handle Errors here.
//     console.log(error);
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...
//   });
// }


  SignUp(email, password) {
    return this.http.post<User>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCyKphftMCyMzRtKSVjor1a0EI8Mmy4gWE',
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
  }



  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      password: user.password,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

//   login() {
//     console.log(this.user.email , this.user.password);
//     firebase.auth().signInWithEmailAndPassword(this.user.email , this.user.password)
//     .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   if (errorCode === 'auth/wrong-password') {
//     alert('Wrong password.');
//   } else {
//     alert(errorMessage);
//   }
//   console.log(error);
// });
//   }
//   // login() {
//   //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
//   //   console.log(this.LoginForm.value);
//   // }
//   logout() {
//     this.afAuth.auth.signOut();
//   }


}


