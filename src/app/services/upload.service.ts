import { Upload } from './upload';
import { Injectable, Output, HostListener } from '@angular/core';
import * as firebase from 'firebase';
import { EventEmitter } from 'events';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  @Output() filesDropped = new EventEmitter();
  @Output() filesHovered = new EventEmitter();

  constructor(
    // private db: AngularFireDatabase,
    ) { }

    SetUploadUrls(Upload) {
      firebase.database().ref(`dupa/${Upload}`).set({
          uid: 'this.user.uidwwwwwwwwwww',
          // email: this.user.email,
          // name: this.user.displayName,
          // emailVerified: this.user.emailVerified,
          // photoURL: this.user.photoURL,
          // returnSecureToken: true
      });
      console.log('ffffffffffffffffffff');
    }

    // pushUpload(upload: Upload) {
    //   console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    //   let storageRef = firebase.storage().ref();
    //   let uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

    //   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //     (snapshot) =>  {
    //       // upload in progress
    //       upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     },
    //     (error) => {
    //       // upload failed
    //       console.log(error)
    //     },
    //     () => {
    //       // upload success
    //       upload.url = uploadTask.snapshot.downloadURL
    //       upload.name = upload.file.name
    //       this.saveFileData(upload)
    //       console.log(upload.url);
    //     }
    //   );
    // }



    // // Writes the file details to the realtime db
    // private saveFileData(upload: Upload) {
    //   this.db.list(`uploads`).push(upload);
    // }

  }

