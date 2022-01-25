import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // ngOnInit() {
  //   this.formData = new FormGroup({
  //     userName: new FormControl("admin"),
  //     password: new FormControl("admin"),
  //   });
  // }
  //
  // onClickSubmit(data: any) {
  //   this.userName = data.userName;
  //   this.password = data.password;
  //
  //   console.log("Login page: " + this.userName);
  //   console.log("Login page: " + this.password);
  //
  //   this.authService.login(this.userName, this.password)
  //     .subscribe( (data: unknown) => {
  //       console.log("Is Login Success: " + data);
  //
  //       if(data) this.router.navigate(['/expenses']);
  //     });
  // }
  user: User = new User();
  errorMessage: string;
  welcomeMessage: string;
  expectedUrl: string;

  @ViewChild('f')
  myForm: NgForm;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.welcomeMessage = params.msg;
        if (params.expectedUrl) {
          this.expectedUrl = params.expectedUrl;
        }
      });
  }

  onSubmit(): void {
    this.authService.auth(this.user).subscribe((data: any) => {

      if (this.authService.getUser().admin == false) {
        this.expectedUrl = '/feedview';
      } else {
        this.expectedUrl = '/admin';
      }

      this.router.navigate([this.expectedUrl]);
    }, (error: any) => {
      this.errorMessage = error.error.message || 'Apparently your server is down: ' + error.message;
    });
  }

}
