import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {error} from 'util';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  private email: string;
  private password: string;
  private displayName: string;
  private errorMsg: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;

    this.authService.signUp(email, password, displayName)
      .then(resolve => this.router.navigate(['login']))
      .catch(catchError => this.errorMsg = catchError.message);
  }

}
