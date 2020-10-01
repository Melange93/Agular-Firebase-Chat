import {Component, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  activeUsersName: string[];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.chat.getActiveUsers()
      .then(value => this.activeUsersName = value)
      .catch(error => console.log(error));
  }

}
