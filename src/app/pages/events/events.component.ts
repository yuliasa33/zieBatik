import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  standalone:true,
  imports:[]
})
export class EventsComponent {

  isExpanded = false;
  content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum...`; // Ganti dengan konten artikel sebenarnya

  constructor(private router:Router){}


  toggleContent() {
    // this.isExpanded = !this.isExpanded;
  
    this.router.navigateByUrl('event-register')
  }

}
