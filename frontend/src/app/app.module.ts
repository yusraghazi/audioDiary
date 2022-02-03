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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/admin/home/home.component';
import { AdminPostsComponent } from './components/admin/admin-posts/admin-posts.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

import {CloudinaryModule} from "@cloudinary/ng";
import { ProfilePostFavoriteComponent } from './components/profile/profile-post-favorite/profile-post-favorite.component';
import { SingleAudioComponent } from './components/feed/single-audio/single-audio.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpResponse} from '@angular/common/http';
import {AuthInterceptorService} from './services/auth.interceptor';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {Ng2SearchPipe, Ng2SearchPipeModule} from "ng2-search-filter";
import { DummyComponentComponent } from './components/dummy-component/dummy-component.component';
import {FileUploadModule} from "ng2-file-upload";
import { provideRoutes} from '@angular/router';

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
     AdminComponent,
     HomeComponent,
     AdminPostsComponent,
     AdminUsersComponent,
     SingleAudioComponent,
     WelcomeComponent,
     DummyComponentComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        FileUploadModule,
        CloudinaryModule,
        Ng2SearchPipeModule,

    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
