import { Component } from '@angular/core';
// import {YouTubePlayerModule} from '@angular/youtube-player';
@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css'],
  standalone:true,
  // imports:[ YouTubePlayerModule]
})
export class VideoplayerComponent {

  constructor(){
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }


}
