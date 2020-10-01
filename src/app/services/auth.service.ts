import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

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

  signUp(email: string, password: string, displayName: string) {

    const newUser = {
      email,
      password,
      userName: displayName
    };

    return this.httpClient.post<User>(this.basicUrl + '/newuser', newUser, this.httpOptions).toPromise()
      .then(obj => console.log(obj));

  }

  login(userName: string, password: string) {

    const userLogin = {
      userName,
      password
    };

    return this.httpClient.post<any>(this.basicUrl + '/login', userLogin, this.httpOptions).toPromise()
      .then(response => {
        this.user = response;
        this.setUserStatus('ONLINE');
        this.router.navigate(['chat']);
      })
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    this.user.status = status;
    const data = {
      userName: this.user.username,
      status
    };

    this.httpClient.put<any>(this.basicUrl + '/update-status', data, this.httpOptions).toPromise()
      .catch(error => console.log(error));

    console.log(this.user);
  }
}
