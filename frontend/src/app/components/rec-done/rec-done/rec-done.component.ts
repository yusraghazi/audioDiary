import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import WaveformPlaylist from 'waveform-playlist';





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

    var playlist = WaveformPlaylist({
      samplesPerPixel: 3000,
      waveHeight: 70,
      container: document.getElementById("playlist"),
      state: "cursor",
      isAutomaticScroll: true,

      colors: {
        waveOutlineColor: "#E0EFF1",
        timeColor: "orange",
        fadeColor: "orange"
      },

      controls: {
        show: false,
        width: 150,
      },
      zoomLevels: [500, 1000, 3000, 5000]
    });


    playlist.load([
      {
        src: "../../assets/audio/creative_minds.mp3"
      }


    ]).then(function () {
      var ee = playlist.getEventEmitter();
      document.getElementById("playAudio").addEventListener("click", function () {
        ee.emit("play");
        console.log("play")

      });

      document.getElementById("pauseAudio").addEventListener("click", function () {
        ee.emit("pause");
      });
    });


  }
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

    }, (reason) => {
    });
  }

//
// playSound(){
//   let audio = new Audio();
//   audio.src = "../assets/audio/creative_minds.mp3";
//   audio.load();
//   audio.play();
//
// }
//
// stopSound(){
//   let audio = new Audio();
//
//   audio.pause();
//   audio.currentTime = 0;
//
// }

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
