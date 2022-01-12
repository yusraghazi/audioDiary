import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {PostsService} from "../../../services/posts.service";
import {Post} from "../../../models/post";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  posts: Post[];
  users: User[];
  popularPosts: unknown;
  currentAdmin: User = new User();

  constructor(private postsService: PostsService, private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAdminOrResearch();
    this.getUsers();
    this.loadPageData();
  }

  async loadThemes() {
    await this.postsService.getTopFiveThemes().then(result => {
      this.popularPosts = result;
      console.log(this.popularPosts);
    });
  }

  async loadPageData() {
    await this.loadThemes();
    ///const ctx = document.getElementById('account');
    const ctx2 = document.getElementById('age');
    // @ts-ignore
    // const myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['User with account', 'User without account'],
    //     datasets: [{
    //       label: 'User type',
    //       data: [8203, 786],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(255, 99, 132, 0.2)',
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(255, 99, 132, 1)',
    //       ],
    //       borderWidth: 1
    //     }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        // @ts-ignore
        labels: [this.popularPosts[0][0], this.popularPosts[1][0], this.popularPosts[2][0], this.popularPosts[3][0], this.popularPosts[4][0]],
        datasets: [{
          label: 'User type',
          // @ts-ignore
          data: [this.popularPosts[0][1], this.popularPosts[1][1], this.popularPosts[2][1], this.popularPosts[3][1], this.popularPosts[4][1]],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(100, 180, 2)',
            'rgb(255, 130, 10)',
          ],
        }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  getUsers() {
    this.userService.getUsers().pipe().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  deleteUser(email: String) {
    this.userService.restGetUser(email).pipe().subscribe(
      (data) => {
        this.userService.delete(data).subscribe(
          (data) => {
            console.log(data);
          }, (error => console.log(error))
        );
      }
    );
  }

  updateUser(email: String) {
    this.userService.restGetUser(email).pipe().subscribe(
      (data) => {
        this.userService.updateUser(data);
      }
    );
  }

  checkAdminOrResearch() {
    let user = this.userService.restGetUser(this.authService.getUser().email)
    user.pipe().subscribe(
      (data) => {
        this.currentAdmin = data;
        console.log(this.currentAdmin.verified);
      }
    )
  }

}
