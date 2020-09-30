import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  private email: string;
  private password: string;
  private errorMsg: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  login() {
    const email = this.email;
    const password = this.password;

    this.authService.login(email, password)
      .then(resolve => this.router.navigate(['chat']))
      .catch(catchError => this.errorMsg = catchError.message);
  }

}
