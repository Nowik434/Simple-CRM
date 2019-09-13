import { AuthService } from './../../services/auth.service';
// import { ChatService } from './../../services/chat.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/services/user';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})


export class UserListComponent {
  users: any;

  constructor(chat: ChatService) {
    chat.getUsers().valueChanges().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }
}




// export class UserListComponent implements OnInit {

//   @Input() uid;
//   @Input() users;

//   presence$;

//   // activeUsers;

//   // constructor(private chatService: ChatService) {
//   //   this.activeUsers = this.chatService.activeUsers;
//   // }

//   constructor(private presence: AuthService) {
//     // this.activeUsers = this.chatService.activeUsers;
//   }

//   ngOnInit() {
//     this.presence$ = this.presence.getUsers().subscribe(res => {
//       this.users = res;
//       console.log(res);
//     })   // this.presence$ = this.presence.getPresence(this.uid);
//     // console.log(this.uid);
//     // console.log(this.activeUsers.subscribe(res => console.log(res)));
//   }

// }





// constructor(private chatService: ChatService) {
//   this.chatService.activeUsers.subscribe(res => {
//     console.log(res);
//     this.activeUsers = res;
//   });
// }

// ngOnInit() {
//   console.log(this.activeUsers);
// }
