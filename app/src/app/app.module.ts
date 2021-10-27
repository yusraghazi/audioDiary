import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/forms/login/login.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { ResetPasswordComponent } from './components/forms/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forms/forgot-password/forgot-password.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecordingPostComponent } from './components/feed/recording-post/recording-post.component';
import { MapviewComponent } from "./components/feed/mapview/mapview.component";
import { FeedviewComponent } from './components/feed/feedview/feedview.component';
import { EditingComponent } from './components/editing/editing.component';
import { CommentsComponent } from './components/feed/comments/comments.component';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SingleCommentComponent } from './components/feed/single-comment/single-comment.component';
import { SwitchComponent } from './components/feed/switch/switch.component';
import { RecDoneComponent } from './components/rec-done/rec-done/rec-done.component';
import { ProfilePostComponent } from './components/profile/profile-post/profile-post.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfilePostFavoriteComponent } from './components/profile/profile-post-favorite/profile-post-favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ProfileComponent,

    ForgotPasswordComponent,
     RecordingPostComponent,
      MapviewComponent,
     FeedviewComponent,
     EditingComponent,
     CommentsComponent,
     SingleCommentComponent,
     SwitchComponent,
     RecDoneComponent,
     ProfilePostComponent,
     ProfileSettingsComponent,
     ProfilePostFavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
