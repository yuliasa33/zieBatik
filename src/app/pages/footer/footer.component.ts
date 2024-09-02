import { Component } from '@angular/core';
import { VisitUsComponent } from "../visit-us/visit-us.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone:true,
  imports: [VisitUsComponent]
})
export class FooterComponent {

}
