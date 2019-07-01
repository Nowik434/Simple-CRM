import { AuthService } from './../services/auth.service';
import { User } from './../services/user';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

user;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private afs: AngularFirestore,
    private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(this.afAuth.authState.pipe(first()).toPromise());
        this.user = user;
        console.log(user.email);
      } else {
        console.log(this.afAuth.user);
        this.afAuth.user
      }
    });
}

  ngOnInit() {
  }

}
