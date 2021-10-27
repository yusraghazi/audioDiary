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

const routes: Routes = [
  {path: '', component: FeedviewComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'feedview', component: FeedviewComponent},
  {path: 'mapview', component: MapviewComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'rec-done', component: RecDoneComponent},
  {path: 'editing', component: EditingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
