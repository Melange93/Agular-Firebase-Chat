import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ChatMessage} from '../models/chat.message.model';
import * as firebase from 'firebase';
import {auth} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: any;
  chatMessages: AngularFireList<ChatMessage[]>;
  chatMessage: ChatMessage;
  userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    /*
    this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }
    });

     */
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'I AM A TeST';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      email: email,
      // userName: this.userName,
      userName: 'testuser',
      message: msg,
      timeSent: timestamp,
    });

    console.log('Called send message');
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    return this.db.list('/messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
      (now.getUTCMonth() + 1) + '/' +
      now.getUTCDay();
    const time = now.getUTCHours() + ':' +
      now.getUTCMinutes() + ':' +
      now.getUTCSeconds();

    return (date + ' ' + time);
  }
}
