import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import {PostsService} from "../../../services/posts.service";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {

  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getReportedPosts().subscribe(
      (data) => {
        // @ts-ignore
        this.posts = data; console.log(data);
      },
      (error) => console.log("Error: " + error.status + " - " + error.error)
    );
  }

  ngAfterViewInit() {
    const ctx = document.getElementById('account');
    const ctx2 = document.getElementById('age');
    // @ts-ignore
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['User with account', 'User without account'],
        datasets: [{
          label: 'User type',
          data: [8203, 786],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
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

    // @ts-ignore
    const myChart2 = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Nature', 'City', 'Music', 'Urban'],
        datasets: [{
          label: 'User type',
          data: [8203, 786, 278, 3330],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(100, 180, 2)',
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

}
