import {Component, DoCheck, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {ChatMessage} from '../models/chat.message.model';
import {User} from '../models/user.model';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, DoCheck {

  activeUserList: Observable<User[]>;
  private newActiveUser = new Subject<string>();

  chatMessages: ChatMessage[];

  constructor(
    private chat: ChatService
  ) {
  }

  ngOnInit() {
    this.chat.getMessages()
      .then(messages => this.chatMessages = messages)
      .catch(error => console.log(error));
  }

  ngDoCheck() {
    this.chat.getMessages()
      .then(messages => this.chatMessages = messages)
      .catch(error => console.log(error));
  }

  sendMessage(message: string) {
    // this.chat.sendMessage(message.trim()).then(returnMessage => this.chatMessages.push(returnMessage));
    this.chat.sendMessage(message.trim());
  }

}
