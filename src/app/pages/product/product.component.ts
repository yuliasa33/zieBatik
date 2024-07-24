import { Component } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:true,
  imports:[
    LayoutsComponent
  ]
})
export class ProductComponent {

}
