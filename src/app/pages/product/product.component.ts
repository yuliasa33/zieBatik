import { Component, OnInit } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:true,
  imports: [
    LayoutsComponent,
    FooterComponent,
    CommonModule
]
})
export class ProductComponent implements OnInit {

  item:any =1

  stars = [1, 2, 3, 4, 5];

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  handleLihatItem(args:any):void{
    console.log(args)
    let id = args
    this.router.navigate(['detail_product',id])
  }

}
