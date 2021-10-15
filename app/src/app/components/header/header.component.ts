import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleNav() {
    $(document).ready(function () {
      $('.menu-toggle').click(function () {
        $('nav').toggleClass('active');
      });
    })
  }
}
