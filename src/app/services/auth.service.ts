import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basicUrl = environment.basicUrl;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  };

  private user: User;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  authUser(): User {
    return this.user;
  }

  signUp(email: string, password: string, displayName: string): void {

    const newUser = {
      email,
      password,
      userName: displayName
    };

    this.httpClient.post<User>(this.basicUrl + '/newuser', newUser, this.httpOptions).toPromise()
      .then(obj => this.router.navigateByUrl('/login'))
      .catch(error => console.log(error));
  }

  login(userName: string, password: string): void {

    const userLogin = {
      userName,
      password
    };

    this.httpClient.post<User>(this.basicUrl + '/login', userLogin, this.httpOptions).toPromise()
      .then(response => {
        this.user = response;
        this.setUserStatus('ONLINE');
        this.router.navigateByUrl('/chat');
      })
      .catch(error => console.log(error));
  }

  logout(): void {
    this.afterLogout();

    /*
    const url = this.basicUrl + '/logout';
    const emptyBody = {};
    console.log('logout funtcion')
    console.log(url)
    return this.httpClient.post(url, emptyBody, this.httpOptions).toPromise()
      .then(value => this.afterLogout())
      .catch(error => console.log(error));

     */
  }

  afterLogout(): void {
    this.setUserStatus('OFFLINE');
    this.user = undefined;
    this.router.navigateByUrl('/login');
  }

  setUserStatus(status: string): void {
    this.user.status = status;
    const data = {
      userName: this.user.username,
      status
    };

    this.httpClient.put<any>(this.basicUrl + '/update-status', data, this.httpOptions).toPromise()
      .then(value => value)
      .catch(error => error);
  }

  getActiveUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(this.basicUrl + '/active-users')
      .toPromise()
      .then(users => users);
  }
}
