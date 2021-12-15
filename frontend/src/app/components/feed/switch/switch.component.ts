import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnInit {

  @Input()
  switchText: string;

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  click() {
    if (this.switchText == "Feedview") {
      this.router.navigateByUrl('/feedview');
    } else {
      this.router.navigateByUrl("/mapview");
    }
  }

}
