import { Component } from '@angular/core';

@Component({
  selector: 'app-visit-us',
  templateUrl: './visit-us.component.html',
  styleUrls: ['./visit-us.component.css'],
  standalone:true
})
export class VisitUsComponent {

  handleClickToYoutube():void{
    window.open('https://www.youtube.com/@ziebatikofficial7309','_blank')
  }


  handleClickToFacebook():void{
    window.open('https://www.facebook.com/Zie.batik.semarang','_blank')
  }

  handleClickToWA():void{
    window.open('https://wa.me/+6285742509295','_blank')
  }

  handleClickToInstagram():void{
    window.open('https://www.instagram.com/zie_batik.id/','_blank')
  }

}
