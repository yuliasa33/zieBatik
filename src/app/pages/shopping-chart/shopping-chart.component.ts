import { Component } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css'],
  standalone:true,
  imports: [LayoutsComponent, FooterComponent]
})
export class ShoppingChartComponent {

}
