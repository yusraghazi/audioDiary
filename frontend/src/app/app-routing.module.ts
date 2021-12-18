import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/forms/login/login.component";
import {RegisterComponent} from "./components/forms/register/register.component";
import {FeedviewComponent} from "./components/feed/feedview/feedview.component";
import {MapviewComponent} from "./components/feed/mapview/mapview.component";
import {ForgotPasswordComponent} from "./components/forms/forgot-password/forgot-password.component";
import {RecDoneComponent} from "./components/rec-done/rec-done/rec-done.component";
import {EditingComponent} from "./components/editing/editing.component";
import {ProfileSettingsComponent} from "./components/profile-settings/profile-settings.component";
import {AdminComponent} from "./components/admin/admin.component";
import {HomeComponent} from "./components/admin/home/home.component";
import {AdminPostsComponent} from "./components/admin/admin-posts/admin-posts.component";
import {AdminUsersComponent} from "./components/admin/admin-users/admin-users.component";
import {SingleAudioComponent} from "./components/feed/single-audio/single-audio.component";

const routes: Routes = [
  {path: '', component: FeedviewComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'feedview', component: FeedviewComponent},
  {path: 'mapview', component: MapviewComponent, children: [
      {path: ":id", component: SingleAudioComponent}
    ] },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'rec-done', component: RecDoneComponent},
  {path: 'editing', component: EditingComponent},
  {path: 'profile-settings', component: ProfileSettingsComponent},
  {path: 'admin', component: AdminComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'location', component: AdminPostsComponent},
      {path: 'users', component: AdminUsersComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
