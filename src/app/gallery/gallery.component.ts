import { Component, OnInit, Input } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import {
//   AngularFireStorage,
//   AngularFireUploadTask
// } from "@angular/fire/storage";
// import { UploadService } from "../services/upload.service";
// import { Upload } from "../services/upload";
// import * as _ from "lodash";
// import { Observable } from "rxjs";
// import {
//   AngularFirestore,
//   AngularFirestoreCollection
// } from "@angular/fire/firestore";
// import { tap, finalize, map } from "rxjs/operators";
// import * as firebase from "firebase";
export interface File2 { downloadURL: string;}
export interface FileId extends File2 { id: string; }

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit {


  private fileCollection: AngularFirestoreCollection<File2>;
  fileList: Observable<FileId[]>;
  isHovering: boolean;
  files: File[] = [];

  constructor(private db: AngularFirestore) {
    this.fileCollection = this.db.collection<File2>('files')
    this.fileList = this.fileCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as File2;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {
    // console.log(this.db.collection<File>('files'));
    // this.fileList = this.db.collection('files').get();
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
  // reff;
  //   // Main task
  //   task: AngularFireUploadTask;

  //   // Progress monitoring
  //   percentage: Observable<number>;

  //   snapshot: Observable<any>;

  //   // Download URL
  //   downloadURL: Observable<string>;

  //   // State for dropzone CSS toggling
//   isHovering: boolean;
//   uploadPercent: any;
//   downloadURL = "";
//   public users$: Observable<any>;
//   storageRef = firebase.storage().ref();
//   // aaa: Observable<Upload[]>;
//   // private aaaCollection: AngularFirestoreCollection<Upload>;

//   constructor(
//     private storage: AngularFireStorage,
//     private db: AngularFirestore,
//     private us: UploadService
//   ) {}

//   //     this.aaaCollection = this.db.collection<Upload>('imageBox');

//   //     this.aaa = this.aaaCollection.snapshotChanges().pipe(
//   //       map(actions => actions.map(a => {
//   //         const data = a.payload.doc.data() as Upload;
//   //         const id = a.payload.doc.id;
//   //         return { id, ...data };

//   //       })))

//   //   }

//   startUpload(file: FileList) {
//     // File or Blob named mountains.jpg
//     var file = file;
//     // var storageRef = firebase.storage().ref();

//     // Create the file metadata
//     var metadata = {
//       contentType: "image/jpeg"
//     };

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     var uploadTask = this.storageRef
//       .child("images/" + file.item(0).name)
//       .put(file.item(0), metadata);

//     // Listen for state changes, errors, and completion of the upload.
//     uploadTask.on(
//       firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//       function(snapshot) {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");
//         this.uploadPercent = progress;
//         switch (snapshot.state) {
//           case firebase.storage.TaskState.PAUSED: // or 'paused'
//             console.log("Upload is paused");
//             break;
//           case firebase.storage.TaskState.RUNNING: // or 'running'
//             console.log("Upload is running");
//             break;
//         }
//       },
//       function(error) {
//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         // switch (error.code) {
//         //   case 'storage/unauthorized':
//         //     // User doesn't have permission to access the object
//         //     break;
//         //   case 'storage/canceled':
//         //     // User canceled the upload
//         //     break;
//         //   case 'storage/unknown':
//         //     // Unknown error occurred, inspect error.serverResponse
//         //     break;
//         // }
//       }
//     );
//     // Upload completed successfully, now we can get the download URL
//     this.getItemList(2222);
//     // console.log(getItemList());
//   }


//   getItemList(item2) {
//     // uploadTask.snapshot.ref.getDownloadURL().then(function aaa(downloadURL) {
//     //   console.log("File available at", downloadURL);
//     // });
//     // Create a reference under which you want to list
//     var listRef = this.storageRef.child("images/");

//     // Find all the prefixes and items.
//     listRef
//       .listAll()
//       .then(function(res) {
//         res.items.forEach(itemList => {
//           itemList.getDownloadURL().then(res => {
//             item2 = res;
//             console.log(res);
//             return res;
//           });
//         });
//       })
//       .catch(function(error) {
//         // Uh-oh, an error occurred!
//         console.log(error);
//       });
//   }


//   // toggleHover(event: boolean) {
//   //   this.isHovering = event;
//   // }

//   // startUpload(file: FileList) {
//   //   console.log(file.item(0));
//   //   const files = file.item(0);

//   //   const filePath = file.item(0).name;
//   //   const fileRef = this.storage.ref(filePath);
//   //   const task = this.storage.upload(filePath, files);

//   //   // observe percentage changes
//   //   this.uploadPercent = task.percentageChanges();
//   //   // get notified when the download URL is available
//   //   task.snapshotChanges().pipe(
//   //       finalize(() => this.downloadURL = fileRef.getDownloadURL() )
//   //    )
//   //   .subscribe(a => {
//   //     console.log(a);
//   //     console.log(this.uploadPercent);
//   //     console.log(fileRef.getDownloadURL());
//   //     console.log(this.downloadURL);
//   //     this.us.SetUploadUrls(this.downloadURL)

//   //   });
//   //   ;
//   // }
// }

// The File object
// const file = event.item(0)

// // Client-side validation example
// if (file.type.split('/')[0] !== 'image') {
//   console.error('unsupported file type :( ')
//   return;
// }

// // The storage path
// const path = `imageBox/${new Date().getTime()}_${file.name}`;

// // Totally optional metadata
// const customMetadata = { app: 'My AngularFire-powered PWA!' };

// // The main task
// this.task = this.storage.upload(path, file, { customMetadata })

// () => this.downloadURL = this.storage.ref(path).getDownloadURL() )
// .subscribe(res => {
//   console.log(res.length);
// });;
// console.log(id, data);
// console.log(this.aaa);
// const vvv = this.db.collection('imageBox').snapshotChanges().pipe(map(actions => {
//   console.log(actions);
// }))

// const vvv = this.reff.snapshotChanges().pipe(
// map(actions => actions.map(a => {
//   const data = a.payload.doc.data() as Upload;
//   const id = a.payload.doc.id;
//   return { id, ...data };
// }))
// );

// console.log(vvv);
// Progress monitoring
// this.percentage = this.task.percentageChanges();
// this.snapshot   = this.task.snapshotChanges()

// The file's download URL
// this.storage.ref(path).snapshotChanges().pipe(
//   finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL() ))
// .subscribe(res => {
//   console.log(res);
// });

//   this.snapshot = this.task.snapshotChanges().pipe(
//     tap(snap => {
//       if (snap.bytesTransferred === snap.totalBytes) {
//         // Update firestore on completion
//         this.db.collection('imageBox').add( { path, size: snap.totalBytes })
//         console.log(snap);
//         console.log(this.db.collection);
//       }
//     })
//   );
// }

// Determines if the upload task is active
// isActive(snapshot) {
//   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes

// }

// }
