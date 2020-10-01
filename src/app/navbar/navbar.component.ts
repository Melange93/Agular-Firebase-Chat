import {AfterContentInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {

  private user: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.user = this.authService.authUser();
  }

  ngDoCheck() {
    const authUser = this.authService.authUser();
    if (this.user !== authUser ) {
      this.user = authUser;
      this.ngOnInit();
    }
  }

  logout() {
    this.authService.logout();
  }

}
