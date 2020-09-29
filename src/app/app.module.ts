import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ChatFormComponent} from './chat-form/chat-form.component';
import {ChatroomComponent} from './chatroom/chatroom.component';
import {FeedComponent} from './feed/feed.component';
import {MessageComponent} from './message/message.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {SignUpFormComponent} from './signup-form/sign-up-form.component';
import {NavbarComponent} from './navbar/navbar.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserItemComponent} from './user-item/user-item.component';

import {ChatService} from './services/chat.service';
import {AuthService} from './services/auth.service';

import {appRoutes} from '../routes';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignUpFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
