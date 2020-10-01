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

  private user: User;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  authUser() {
    return this.user;
  }

  signUp(email: string, password: string, displayName: string) {

    const newUser = {
      email,
      password,
      userName: displayName
    };

    return this.httpClient.post<User>(this.basicUrl + '/newuser', newUser, this.httpOptions).toPromise()
      .then(obj => console.log(obj))
      .catch(error => console.log(error));
  }

  login(userName: string, password: string) {
    console.log('Hello');

    const userLogin = {
      userName,
      password
    };

    return this.httpClient.post<any>(this.basicUrl + '/login', userLogin, this.httpOptions).toPromise()
      .then(response => {
        this.user = response;
        this.setUserStatus('ONLINE');
        this.router.navigateByUrl('/chat');
      })
      .catch(error => console.log(error));
  }

  logout() {
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

  afterLogout() {
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
      .catch(error => console.log(error));
  }
}
