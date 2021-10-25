import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/forms/login/login.component";
import {RegisterComponent} from "./components/forms/register/register.component";
import {FeedviewComponent} from "./components/feed/feedview/feedview.component";

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'feedview', component: FeedviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
