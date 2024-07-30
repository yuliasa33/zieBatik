import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations:[fadeInAnimation]
})
export class EventsComponent implements OnInit {

  imagesSelect: any = ""
  titleSelect: any = ""
  isExpanded = false;
  content = ``; // Ganti dengan konten artikel sebenarnya

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

  constructor(private router: Router) {
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

}
