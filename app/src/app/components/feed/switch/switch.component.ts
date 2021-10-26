import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  switch: boolean;
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  click(view: string) {
    // if (view == "feed") {
    //   this.router.navigateByUrl('/feedview');
    // } else {
    //   this.router.navigateByUrl('/mapview');
    // }
  }

}
