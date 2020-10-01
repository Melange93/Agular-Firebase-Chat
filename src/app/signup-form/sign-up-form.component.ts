import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  private email: string;
  private password: string;
  private displayName: string;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  signUp() {
    const email = this.email;
    const password = this.password;
    const displayName = this.displayName;

    this.authService.signUp(email, password, displayName);
  }

}
