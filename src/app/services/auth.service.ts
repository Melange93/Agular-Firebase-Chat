import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basicUrl = environment.basicUrl;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  constructor(
    private httpClient: HttpClient
  ) {
  }

  signUp(email: string, password: string, displayName: string) {

    const newUser = {
      email,
      password,
      userName: displayName
    };

    return this.httpClient.post<User>(this.basicUrl + '/newuser', newUser, this.httpOptions).toPromise()
      .then(obj => console.log(obj));

  }

  login(email: string, password: string) {

    const userLogin = {
      userEmail: email,
      password
    };

    return this.httpClient.post<any>(this.basicUrl + '/login', userLogin, this.httpOptions).toPromise()
      .then(obj => console.log(obj));
  }
}
