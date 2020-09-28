import {Routes} from '@angular/router';
import {SignUpFormComponent} from './app/signup-form/sign-up-form.component';
import {LoginFormComponent} from './app/login-form/login-form.component';
import {ChatroomComponent} from './app/chatroom/chatroom.component';

export const appRoutes: Routes = [
  {path: 'signup', component: SignUpFormComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'chat', component: ChatroomComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
