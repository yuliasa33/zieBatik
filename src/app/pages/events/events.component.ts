import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [fadeInAnimation]
})
export class EventsComponent implements OnInit {

  @Input("Events") Events: any

  imagesSelect: any = ""
  titleSelect: any = ""
  isExpanded = false;
  content = ``; // Ganti dengan konten artikel sebenarnya

  evnet = [1, 2, 3, 4, 5, 6, 7, 8]

  items = [{
    no: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aliquam.",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, expedita placeat consequatur similique magnam veritatis",
    image: '../../../assets/images/beautyofbatik2.jpg'
  },
  {
    no: 2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aliquam.",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, expedita placeat consequatur similique magnam veritatis",
    image: '../../../assets/images/beautyofbatik4.jpg'
  },
  {
    no: 3,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aliquam.",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, expedita placeat consequatur similique magnam veritatis",
    image: '../../../assets/images/beautyofbatik3.jpg'
  }]

  constructor(private router: Router,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {

  }



  toggleContent() {
    // this.isExpanded = !this.isExpanded;

    this.router.navigateByUrl('event-register')
  }

  handlClickNews(args: any): void {
    console.log(args)
    this.imagesSelect = args.image
    this.titleSelect = args.title
    this.content = args.text
  }

  handleClickLihatLebihBanyak(): void {
    this.router.navigateByUrl('list-event')
  }

}
