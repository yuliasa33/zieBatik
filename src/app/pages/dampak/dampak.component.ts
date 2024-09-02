import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { StyleUnderlinedComponent } from 'src/app/components/style-underlined/style-underlined.component';

@Component({
  selector: 'app-dampak',
  templateUrl: './dampak.component.html',
  styleUrls: ['./dampak.component.css'],
  standalone:true,
  imports: [CommonModule, CarouselComponent,StyleUnderlinedComponent]
})
export class DampakComponent implements OnInit {

  @Input('Props') Props:any

  constructor(){

  }

  ngOnInit(): void {
    
  }


}
