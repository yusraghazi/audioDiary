import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rec-done',
  templateUrl: './rec-done.component.html',
  styleUrls: ['./rec-done.component.css']
})
export class RecDoneComponent implements OnInit {
  closeResult = '';
  cardColor = '#FE5F38'

  constructor(private modalService: NgbModal, private router: Router) {

  }

  ngOnInit(): void {


  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {

    });
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

activateSoundWaves(){
  const soundWaves = document.getElementById("soundwavesWrapper");

   soundWaves.classList.remove('onClickWrapper');
   soundWaves.classList.add("wrapper");
 }

  getSelectedColor(){
    return this.cardColor;
  }

  buttonEditing(){
    this.router.navigateByUrl('editing');
  }

}
