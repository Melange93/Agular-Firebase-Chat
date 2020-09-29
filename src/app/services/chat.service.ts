import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/chat.message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private basicUrl = environment.basicUrl;
  private httpOptions = {
    headers: new HttpHeaders(
      {'Content-Type': 'application/json'})
  };

  private user: any;
  private chatMessages: ChatMessage[];
  private chatMessage: ChatMessage;
  private userName: Observable<string>;

  constructor(
    private httpClient: HttpClient,
  ) {
    /*
    set user here
     */
  }


  sendMessage(msg: string): void {
    console.log(msg);
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'zest@zest.com';

    const newChatMassage = {
      email: email,
      userName: 'testuser',
      message: msg,
      timeStamp: new Date(timestamp)
    };

    this.httpClient.post<ChatMessage>(this.basicUrl + '/insert-message', newChatMassage, this.httpOptions).toPromise().then();
  }

  getMessages(): Promise<ChatMessage[]> {
    return this.httpClient.get<any>(this.basicUrl + '/messages').toPromise().then(
      obj => obj);
  }


  /*
  sendMessage(msg: string) {
    console.log(msg);
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'zest@zest.com';

    const newChatMassage = {
      email: email,
      userName: 'testuser',
      message: msg,
      timeStamp: new Date(timestamp)
    };

    console.log(newChatMassage);
    this.httpClient.post<ChatMessage>(this.basicUrl + '/insert-message', newChatMassage, this.httpOptions).pipe();

  }

  getMessages(): Observable<ChatMessage[]> {
    return this.httpClient.get<ChatMessage[]>(this.basicUrl + '/messages').pipe();
  }

   */

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
