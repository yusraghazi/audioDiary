import { Component, OnInit } from '@angular/core';
import Chart from "chart.js/auto";

@Component({
  selector: 'app-admin-location',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  chart: Chart
  type: string = 'bar'
  data: any;

  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels: ['Posts today'],
      datasets: [{
        label: 'Amount of posts',
        data: [820],
        // @ts-ignore
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        // @ts-ignore
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }
      ]
    }

    const ctx = document.getElementById('chart');
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: {}
    });
  }

  changeChart(date: string) {
    this.chart.destroy();

    let labels = {};

    if (date == 'day') {
      labels = ['Posts today'];
      this.type = 'bar';
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [820],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }
        ]
      }
    } else if (date == 'week') {
      this.type = 'line';
      labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    } else if (date == 'month') {
      this.type = 'line';
      labels = ['Week 40', 'Week 41', 'Week 42', 'Week 43'];
      this.data = {
        labels: labels,
        datasets: [{
          label: 'Amount of posts',
          data: [299, 159, 180, 302],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };
    }
    const ctx = document.getElementById('chart');
    // @ts-ignore
    this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
    });
  }
}
