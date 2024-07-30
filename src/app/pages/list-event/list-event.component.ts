import { Component } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
  standalone:true,
  imports:[LayoutsComponent,FooterComponent,CommonModule]
})
export class ListEventComponent {

  produk:any = [1,2,3,4,5,6,7,8]

  items = {}

  detail(args:any):void{

  }

}
