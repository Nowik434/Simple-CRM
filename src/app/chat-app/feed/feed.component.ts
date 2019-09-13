import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FirebaseListObservable } from '@angular/fire/database-deprecated/firebase_list_observable';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges  {
  feed: any;
  feeds;


  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages().valueChanges();
    console.log(this.feed.subscribe(res => console.log(res.map(item => item))));
    // this.feed.valueChanges().subscribe(res => {
    //   this.feeds = res.map(item => {
    //      return item;
    //   })
    // });
    console.log(this.feed);
  }

  ngOnChanges() {
    // this.feed = this.chat.getMessages();
    // this.feed.valueChanges().subscribe(res => {
    //   this.feeds = res.map(item => {
    //     return item;
    //  })
    // });
  }

}
