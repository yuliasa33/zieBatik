import { Component } from '@angular/core';
import { StyleUnderlinedComponent } from "../../components/style-underlined/style-underlined.component";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone:true,
  imports: [StyleUnderlinedComponent]
})
export class ArticleComponent {

}
