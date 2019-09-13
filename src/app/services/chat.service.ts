import { FirebaseListObservable } from '@angular/fire/database-deprecated/firebase_list_observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from './../models/chat-message.model';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { LimitToOptions } from '@angular/fire/database-deprecated/interfaces';


import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore, QueryDocumentSnapshot, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user';
import { map } from 'rxjs/operators';
export interface UserId extends User { id: string; }
@Injectable()
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  // user;
  // chatMessages: FirebaseListObservable<ChatMessage[]>;
  // chatMessage: ChatMessage;
  // userName;
  // private activeUsersCollection: AngularFirestoreCollection<User>;
  // activeUsers: Observable<UserId[]>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private as: AuthService,
    private afs: AngularFirestore,

    ) {


      this.afAuth.authState.subscribe(auth => {
        if (auth !== undefined && auth !== null) {
          this.user = auth;
        }

        this.getUser().valueChanges();
      });



      // this.activeUsersCollection = this.afs.collection<User>('users');
      // this.activeUsers = this.activeUsersCollection.snapshotChanges().pipe(
      //   map(actions => actions.map(a => {
      //     const data = a.payload.doc.data() as User;
      //     const id = a.payload.doc.id;
      //     return { id, ...data };
      //   }))
      //   );

      //   // this.getUser().subscribe(a => {
      //   //   // console.log(a);
      //   //   this.userName = a.displayName;
      //   // });

      //   this.getUsers();
    }

    getUser() {
      const userId = this.user.uid;
    const path = `/status/${userId}`;
    return this.db.object(path);
    }

    getUsers() {
      const path = '/status';
      return this.db.list(path);
    }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: 'this.userName',
      email: email });

      console.log(timestamp);
      console.log(this.getMessages());
      console.log(msg);
      console.log(this.chatMessages.snapshotChanges().subscribe(res => console.log(res)));
      console.log('Called sendMessage();');
  }

  getMessages(): AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(15)
    // console.log("test ok")
)};

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
