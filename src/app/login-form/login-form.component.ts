import {Component, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private username: string;
  private password: string;
  private errorMsg: string;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  login() {
    const username = this.username;
    const password = this.password;

    this.authService.login(username, password)
      .catch(catchError => this.errorMsg = catchError.message);
  }

}
