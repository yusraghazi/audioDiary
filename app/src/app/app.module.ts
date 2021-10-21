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
import { FeedviewComponent } from './components/feed/feedview/feedview.component';
import { EditingComponent } from './components/editing/editing.component';
import {FormsModule} from "@angular/forms";

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
     FeedviewComponent,
     EditingComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
