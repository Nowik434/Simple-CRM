import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  private authState: any = null;
  private users: any;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
      this.updateOnUser().subscribe();
      this.updateOnDisconnect().subscribe();
      this.updateOnAway();
      this.getUsers();


      // this.users = db.list('users').valueChanges();
      // this.afAuth.authState.subscribe((auth) => {
      //   console.log(auth);
      //   this.authState = auth;
      // })
      // this.user = afAuth.authState;
      // console.log(this.users);
      // console.log(this.currentUser);
      // console.log(this.authenticated);
    }

    getPresence(uid: string) {
      return this.db.object(`status/${uid}`).valueChanges();
    }

    getUser() {
      return this.afAuth.authState.pipe(first()).toPromise();
    }

    getUsers() {
      const path = '/status';
      return this.db.list(path).valueChanges();
      // console.log(this.users);
      // this.users.subscribe(res => {
      //   return res;
      // });

    }

    async setPresence(status: string) {
      const user = await this.getUser();
      if (user) {
        return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp });
      }
    }

    get timestamp() {
      return firebase.database.ServerValue.TIMESTAMP;
    }

    updateOnUser() {
      const connection = this.db.object('.info/connected').valueChanges().pipe(
        map(connected => connected ? 'online' : 'offline')
      );

      return this.afAuth.authState.pipe(
        switchMap(user =>  user ? connection : of('offline')),
        tap(status => this.setPresence(status))
      );
    }

  updateOnAway() {
    document.onvisibilitychange = (e) => {
      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
          });
        }
      })
    );
  }

  // updateImageUrl() {
  //   return this.afAuth.authState.pipe(
  //     tap(user => {
  //       if (user) {
  //         this.db.object(`status/${user.uid}`)
  //           .update({
  //             imageUrl: 'dddduuuppppaaaa',
  //         });
  //       }
  //     })
  //   );
  // }

  // async signOut() {
  //   await this.setPresence('offline');
  //   await this.afAuth.auth.signOut();
  // }













    authUser() {
      return this.user;
    }

    // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

    get currentUserId(): string {
      return this.authState !== null ? this.authState.user.uid : '';
    }

    login(email: string, password: string) {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          this.authState = user;
          this.setUserData(email)
          this.router.navigate(['dashboard']);
          // console.log(this.authState);
          // console.log(user);
        });
    }

    async logout() {
      // this.updateOnDisconnect();
      await this.setPresence('offline');
      await this.afAuth.auth.signOut();
      this.router.navigate(['login']);
    }

    signUp(email: string, password: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
              .then((user) => {
                this.authState = user;
                this.setUserData(email);
                this.router.navigate(['dashboard']);
              });
    }

    setUserData(email: string): void {
      const path = `status/${this.currentUserId}`;
      const data = {
        email: email,
      };

      this.db.object(path).update(data)
        .catch(error => console.log(error));
    }

    // setUserStatus(status: string): void {
    //   const path = `users/${this.currentUserId}`;

    //   const data = {
    //     status
    //   };

    //   this.db.object(path).update(data)
    //     .catch(error => console.log(error));
    // }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { User } from "./user";
// import { Injectable, NgZone } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { Router } from "@angular/router";
// import {
//   AngularFirestore,
//   AngularFirestoreDocument
// } from '@angular/fire/firestore';
// import * as firebase from "firebase";
// import { Observable, of } from "rxjs";
// import { AngularFireDatabase } from "@angular/fire/database-deprecated";
// import { switchMap } from "rxjs/operators";

// @Injectable({
//   providedIn: "root"
// })
// export class AuthService {
//   private user: Observable<firebase.User>;
//   // private authState: any;

//   constructor(
//     public afs: AngularFirestore,
//     public ngZone: NgZone,
//     public http: HttpClient,
//     private afAuth: AngularFireAuth,
//     // private db: AngularFireDatabase,
//     private router: Router
//   ) {
//     this.user = afAuth.authState.pipe(
//       switchMap(user => {
//         if (user) {
//           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
//         } else {
//           return of(null);
//         }
//       })
//     );

//     this.user.subscribe(res => console.log(res));

//     this.afAuth.auth.onAuthStateChanged(user => {
//       // console.log(user);
//       if (user) {
//         // User is signed in.
//         console.log('user is logged in: ', user);
//       } else {
//         // No user is signed in.
//         console.log('user is logged out');
//       }
//     });

//   }

//   authUser() {
//     return this.user;
//   }

//   // get currentUserId(): string {
//   //   return this.authState !== null ? this.authState.uid : "";
//   // }

//   SignIn(email: string, password: string) {
//     return this.afAuth.auth
//       .signInWithEmailAndPassword(email, password)
//       .then(user => {
//         // console.log(user);
//         // console.log(user.user.uid);
//         // console.log(this.afs.doc(`users/${user.uid}`));
//         // this.authState = user;
//         // console.log(this.user, this.authState);
//         // this.setUserStatus(user.user, true);
//         this.setUserData(user);

//         this.router.navigate(["dashboard"]);
//       });
//   }

//   logout() {
//     // this.afAuth.auth.onAuthStateChanged(user => {
//     //   this.setUserStatus(user, false);
//     // });
//     this.router.navigate(["login"]);
//     this.afAuth.auth.signOut();
//   }

//   SignUp(email: string, password: string) {
//     return this.afAuth.auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(user => {
//         // console.log(user);
//         // this.authState = user;
//         // this.setUserStatus(user, false);
//         // const status = 'online';
//         this.setUserData(user);
//       })
//       .catch(error => console.log(error));
//   }

//   setUserData(user) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//       `users/${user.user.uid}`
//     );
//     // console.log(user);
//     // console.log(userRef);
//     const data = {
//       uid: user.user.uid,
//       email: user.user.email,
//       displayName: user.user.displayName,
//       photoURL: user.user.photoURL,
//       emailVerified: user.user.emailVerified,
//       status: true
//     };

//     return userRef.set(data, { merge: true });
//   }

//   setUserStatus(user, status: boolean) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//       `users/${user.uid}`
//     );
//     // console.log(userRef);
//     const data = {
//       status
//     };
//     return userRef.set(data, { merge: true });
//   }
// }



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// export class AuthService {
//   user: User;
//   url = 'AIzaSyCyKphftMCyMzRtKSVjor1a0EI8Mmy4gWE';
//   errorMessage = '';

//   constructor(
//     public afs: AngularFirestore,
//     public afAuth: AngularFireAuth ,
//     public router: Router,
//     public ngZone: NgZone,
//     public http: HttpClient,
//   ) { }

// // showError() {
// //   return this.error;
// // }

// SignIn(email, password) {
//     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         this.ngZone.run(() => {
//           this.router.navigate(['dashboard']);
//           console.log(result);
//         });
//         this.SetUserData(result.user);
//       }).catch((error) => {

//         switch(error.code) {
//           case 'auth/invalid-email':
//             this.errorMessage = 'Nieprawidłowy adres email';
//             break;
//           case 'auth/invalid-password':
//             this.errorMessage = 'Nieprawidłowe hasło';
//             break;
//           case 'auth/user-not-found':
//             this.errorMessage = 'Nie znaleziono użytkownika';
//             break;
//         }
//         console.log(error.message)
//         console.log(this.errorMessage)
//       });
//   }

// // SignUp(email, password) {
// //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
// //   )
// //   .catch((error) => {
// //     // Handle Errors here.
// //     console.log(error);
// //     var errorCode = error.code;
// //     var errorMessage = error.message;
// //     // ...
// //   });
// // }

//   SignUp(email, password) {
//     return this.http.post<User>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCyKphftMCyMzRtKSVjor1a0EI8Mmy4gWE',
//       {
//         'email': email,
//         'password': password,
//         'returnSecureToken': true
//       })
//   }

//   SetUserData(user) {
//     firebase.database().ref(`users/${user.uid}`).set({
//         email: this.user.email,
//         name: this.user.displayName,
//         emailVerified: this.user.emailVerified,
//         photoURL: this.user.photoURL,
//         returnSecureToken: true
//     });
//   }

//   // SetUserData(email: string, displayName: string, status: string): void {
//   //   const path = `users/${this.user.uid}`;
//   //   const data = {
//   //     email: email,
//   //     displayName: displayName,
//   //     status: status
//   //   };

//   //   this.db.object(path).update(data)
//   //     .catch(error => console.log(error));
//   // }

//   // SetUserData(user) {
//   //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
//   //   const userData: User = {
//   //     uid: user.uid,
//   //     email: user.email,
//   //     password: user.password,
//   //     displayName: user.displayName,
//   //     photoURL: user.photoURL,
//   //     emailVerified: user.emailVerified
//   //   }
//   //   return userRef.set(userData, {
//   //     merge: true
//   //   })
//   // }

// //   login() {
// //     console.log(this.user.email , this.user.password);
// //     firebase.auth().signInWithEmailAndPassword(this.user.email , this.user.password)
// //     .catch(function(error) {
// //   // Handle Errors here.
// //   var errorCode = error.code;
// //   var errorMessage = error.message;
// //   if (errorCode === 'auth/wrong-password') {
// //     alert('Wrong password.');
// //   } else {
// //     alert(errorMessage);
// //   }
// //   console.log(error);
// // });
// //   }
// //   // login() {
// //   //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
// //   //   console.log(this.LoginForm.value);
// //   // }
// //   logout() {
// //     this.afAuth.auth.signOut();
// //   }

// }
