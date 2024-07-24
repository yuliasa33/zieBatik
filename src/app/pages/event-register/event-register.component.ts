import { Component } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from "../footer/footer.component";
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css'],
  standalone:true,
  imports: [LayoutsComponent, FooterComponent,CommonModule]
})
export class EventRegisterComponent {

  navbarMenu:any[] = [
    {label:'Home'},
    {label:'About'},
    {label:'Pricing'},
    {label:'Service'},
  ]

  constructor(public layoutService:LayoutService){

  }

}
