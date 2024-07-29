import { Component,OnInit,VERSION } from '@angular/core';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { FooterComponent } from "../footer/footer.component";
import { CurrencyPipe } from '@angular/common';

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

  constructor(private currencyPipe: CurrencyPipe) {
    this.subtotal = this.pricePerItem; // Initialize subtotal based on the price of one item
  }

  ngOnInit(): void {
    console.log(this.qty_value);
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
}
