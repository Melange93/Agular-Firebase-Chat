import {Component, OnInit, Input} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {ChatMessage} from '../models/chat.message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() chatMessages: ChatMessage[];

  constructor() {  }

  ngOnInit() {  }

}
