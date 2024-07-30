import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css'],
  standalone:true,
  imports: [LayoutsComponent, FooterComponent,CommonModule,FormsModule]
})
export class ShoppingChartComponent implements OnInit{

  selectedAlamat:any = "Pilih Alamat Pengiriman";
  cart:any = [];
  harga:number=0;
  biaya_kirim:number=0;
  total:number=0;
  provinsi:any[] = [];
  kota:any[] = [];
  alamat:any[] = []
  constructor(
    private router:Router,
    private produkService:ProdukService
  ){}

  ngOnInit(): void {
    this.reload();
    this.produkService.provinsi().subscribe(result=>{
      this.provinsi = result.data.rajaongkir.results
    })
    this.reload_alamat();
  }

  setkota(id_provinsi:any){
    this.produkService.kota(id_provinsi).subscribe(result=>{
      this.kota = result.data.rajaongkir.results
    })
  }

  reload_alamat(){
    this.produkService.get_alamat().subscribe(result=>{
      this.alamat = result.data
    })
  }

  reload(){
    this.produkService.getcart().subscribe(result=>{
      this.cart = result.data
      this.hitung();
      console.log(result.data)
    })
    
  }

  hitung(){
    this.harga=0
    this.cart.forEach((element:any) => {
      if(element.checked=='1'){
        this.harga = this.harga + (element.qty*element.product.harga)
      }
      this.total = this.harga + this.biaya_kirim
    });
  }

  updateQty(item:any,type:number):void{
    console.log(item,type);
    let c = item.checked;
    if(type==1){
      if(item.checked=='0'){
        item.checked=true
      }else{
        item.checked=false
      }
    }
    this.hitung();
    this.produkService.updatecart({
      id_cart:item.id_cart,
      qty:item.qty,
      checked:item.checked,
    }).subscribe(result=>{
      // this.reload();
    }) 
  }

  updateQty_(item:any,type:number):void{
    this.produkService.updatecart({
      id_cart:item.id_cart,
      qty:item.qty,
      checked:item.checked,
    }).subscribe(result=>{
      // this.reload();
    }) 
   this.hitung();
  }

  hapus(id_cart:number):void{
    this.produkService.hapuscart(id_cart).subscribe(result=>{
      this.reload();
    })
  }
}
