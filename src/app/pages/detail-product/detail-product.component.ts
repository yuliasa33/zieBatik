import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  standalone:true,
  imports: [LayoutsComponent, FooterComponent],
  providers:[CurrencyPipe]
})
export class DetailProductComponent implements OnInit {

  pricePerItem = 799000;
  qty_value: number = 1;
  subtotal: number;
  id:any

  detail:any ;

  constructor(
    private currencyPipe: CurrencyPipe,
    private produkService: ProdukService,
    private activedRoute: ActivatedRoute,
    private domsanitizer: DomSanitizer,
    private router:Router
  ) {
    this.subtotal = this.pricePerItem; // Initialize subtotal based on the price of one item
  }

  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.produkService.getdetailproduk(this.id).subscribe(result=>{
      this.detail = result.data
      this.pricePerItem = parseInt(result.data.harga)
      this.subtotal = parseInt(result.data.harga)
      this.detail.deskripsi_produk = this.domsanitizer.bypassSecurityTrustHtml(this.detail.deskripsi_product);
      console.log(result.data)
    }) 
  }

  decrement(e: any) {
    if (this.qty_value > 1) {
      this.qty_value--;
      this.subtotal = this.qty_value * this.pricePerItem;
    }
    return this.currencyPipe.transform(this.subtotal,'IDR');
  }

  increment(e: any) {
    this.qty_value++;
    this.subtotal = this.qty_value * this.pricePerItem;
    return this.currencyPipe.transform(this.subtotal,'IDR');
  }

  addcart(){
    let data = {
      id_customer : 1,
      id_product : this.id,
      qty : this.qty_value
    }
    this.produkService.addcart(data).subscribe(result=>{
      console.log(result);
      this.router.navigateByUrl('shoping-chart')
    });
  }
}
