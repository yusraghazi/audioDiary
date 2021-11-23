import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})
export class EditingComponent implements OnInit {

  editTitle: string = 'card title';
  editDescription: string = 'here comes the description';

  cardColor = '#FE5F38'


  constructor() { }

  ngOnInit(): void {
  }


  getSelectedColor(){
    return this.cardColor;
  }

}
