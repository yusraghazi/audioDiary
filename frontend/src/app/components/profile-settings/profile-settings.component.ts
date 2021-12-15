import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: User = null;
  errorMessage: string;
  welcomeMessage: string;

  constructor(public auth: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  onSubmit() {
    console.log(this.user);
    // this.userService.updateUser(this.user).subscribe(
    //   (data) => {
    //     this.welcomeMessage = "gelukt"
    //     //this.router.navigate(['/feedview'], {queryParams: { email: this.user.email, msg: 'the user was successfuly addded - you can proceed with the login' } });
    //   },(error) => {
    //     this.errorMessage = error.message;
    //     console.log(error);
    //   }
    // );
  }

}
