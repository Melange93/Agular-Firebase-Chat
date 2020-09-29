import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  @Output() message = new EventEmitter<string>();

  constructor() {  }

  ngOnInit() {
  }

  send(message: string) {
    this.message.emit(message);
  }
}
