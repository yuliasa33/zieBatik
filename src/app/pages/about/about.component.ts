import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VideoplayerComponent } from "../videoplayer/videoplayer.component";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [VideoplayerComponent]
})
export class AboutComponent {

}
