import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UploadService } from './../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(
    private af: AngularFireAuth,
    private storage: AngularFireStorage,
    private as: AuthService,
    private db: AngularFireDatabase
    ) {}
  user: any;
  userName: string;
  photoUrl: string;
  url: string;

  UserUpdate = new FormGroup({
    displayName: new FormControl(this.UserUpdate, [
      Validators.required,
    ]),
    photoUrl: new FormControl(this.UserUpdate, [
      Validators.required,
    ]),
  });

  ngOnInit() {
    this.af.user.subscribe( user => {
      this.userName = user.displayName;
      this.photoUrl = user.photoURL;
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    console.log(file.name);
    const filePath = file.name;
    this.storage
      .upload(filePath, file)
      .then(() => {
        const ref = this.storage.ref(filePath);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          const Url = url;
          this.url = url;
          console.log(Url);
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateProfile() {
    this.user = firebase.auth().currentUser;
    console.log(this.user.uid);
    console.log(this.url);
    console.log(this.UserUpdate.value.displayName);
    this.user.updateProfile({
        displayName: this.UserUpdate.value.displayName,
        photoURL: this.url
      })
      .then(() => {
        const path = `status/${this.user.uid}`;
        const data = {
          photoUrl: this.photoUrl
        };
        this.db.object(path).update(data)
        .catch(error => console.log(error));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
