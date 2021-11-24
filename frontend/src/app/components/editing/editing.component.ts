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

  imageSrc: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }

  url: any; //Angular 11, for stricter type
  msg = "";

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  getSelectedColor(){
    return this.cardColor;
  }

}
