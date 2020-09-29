import {Component, OnInit, OnChanges} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/chat.message.model';
import {extractMessages} from '@angular/compiler/src/i18n/extractor_merger';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed: ChatMessage[];

  constructor(
    private chat: ChatService
  ) {
  }

  ngOnInit() {
    this.chat.getMessages().then(messages => this.feed = messages);
  }

  ngOnChanges() {
    this.chat.getMessages().then(messages => this.feed = messages);
  }

}
