import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/animations/animations';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:true,
  imports: [
    LayoutsComponent,
    FooterComponent,
    CommonModule
],
animations:[fadeInAnimation]
})
export class ProductComponent implements OnInit {

  item:any =1

  stars = [1, 2, 3, 4, 5];

  items = [1,2,3,4,5,6,7,8]

  produk:any =[];

  constructor(
    private router:Router,
    private produkService:ProdukService
  ){}

  ngOnInit(): void {
    this.produkService.getallproduk().subscribe(result=>{
      console.log(result)
      this.produk = result.data
    });
  }

  detail(id:any):void{
    this.router.navigateByUrl('product/'+id)
  }

}
