import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user";
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {
  user: User = this.auth.getUser();
  errorMessage: string;

  @ViewChild('f')
  myForm: NgForm;

  constructor(private service: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    //this.user = this.auth.getUser();
  }

  onSubmit(): void {
    this.service.updateUser(this.user).subscribe(
      (data) => {
        this.router.navigate(['/feedview']);
      },(error) => {
        this.errorMessage = error.message.toString();
      }
    );
  }

}
