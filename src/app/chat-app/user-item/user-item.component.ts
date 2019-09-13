import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  photoUrl: string;
  @Input() user: User;

  constructor(
    private db: AngularFireDatabase
  ) { console.log(this.user)}

  ngOnInit() {
    this.db.list('/status').valueChanges().subscribe(res => {
      // this.photoUrl = res;
    })
  }

}
