import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../models/chat.message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();

  constructor() { }

  ngOnInit(chatMessage = this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.timeStamp = chatMessage.timeStamp;
    this.userName = chatMessage.userName;
  }

}
