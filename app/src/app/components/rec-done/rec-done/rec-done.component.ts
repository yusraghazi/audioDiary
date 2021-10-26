import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-rec-done',
  templateUrl: './rec-done.component.html',
  styleUrls: ['./rec-done.component.css']
})
export class RecDoneComponent implements OnInit {

  cardColor = '#FE5F38'

  constructor() {

  }

  ngOnInit(): void {


  }


playSound(){
  let audio = new Audio();
  audio.src = "../assets/audio/creative_minds.mp3";
  audio.load();
  audio.play();

}

stopSound(){
  let audio = new Audio();

  audio.pause();
  audio.currentTime = 0;



}




  getSelectedColor(){
    return this.cardColor;
  }

}
