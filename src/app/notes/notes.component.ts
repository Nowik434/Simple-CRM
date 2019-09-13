import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



interface Post {
  title: string;
  content: string;
}

interface PostId extends Post {
  id: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  postsCol: AngularFirestoreCollection<Post>;
  postsArray: any;
  posts: any;
  postDoc: AngularFirestoreDocument<Post>;
  post: Observable<Post[]>;

  title:string;
  content:string;

  userId;

  constructor(
    private afs: AngularFirestore,
    private as: AuthService
    ) {
      this.userId = this.as.currentUserId;

      this.postsCol = this.afs.collection(`notes/${this.userId}/note`);

      this.postsCol.valueChanges().subscribe(res => {
        this.postsArray = res;
      });
    }

  ngOnInit() {


    this.posts = this.postsCol.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          console.log(id, data);
          return { id, data };
        });
      })
    );
    console.log(this.userId);

    console.log(this.postsArray);
    console.log(this.post);
  }

  // addPost() {
  //   this.afs.collection('posts').add({'title': this.title, 'content': this.content});
  // }

  addPost() {
    // this.afs.collection('posts').doc('my-custom-id').set({'title': this.title, 'content': this.content});
    this.afs.collection(`notes/${this.userId}/note`).add({'title': this.title, 'content': this.content});
  }

  // getPost(postId) {
  //   this.postDoc = this.afs.doc(`notes/${this.userId}`+postId);
  //   this.post = this.postDoc.valueChanges();
  // }

  // deletePost(postId) {
  //   this.afs.doc(`notes/${this.userId}`+postId).delete();
  // }

  drop(event: CdkDragDrop<string[]>) {
    // this.afs.collection("notes").ref.orderBy('note')
    moveItemInArray(this.postsArray, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex);
    console.log(event.previousIndex);
    // this.postsArray[1] = '32323232'
  }

}
