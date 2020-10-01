import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/chat.message.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private basicUrl = environment.basicUrl;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
  }

  sendMessage(msg: string): Promise<ChatMessage> {
    const timestamp = this.getTimeStamp();
    const newChatMassage = {
      userName: this.authService.authUser().username,
      message: msg,
      timeStamp: new Date(timestamp)
    };

    return this.httpClient.post<ChatMessage>(this.basicUrl + '/insert-message', newChatMassage, this.httpOptions).toPromise()
      .then(obj => obj);
  }

  getMessages(): Promise<ChatMessage[]> {
    return this.httpClient.get<any>(this.basicUrl + '/messages', this.httpOptions).toPromise()
      .then(obj => obj);
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
