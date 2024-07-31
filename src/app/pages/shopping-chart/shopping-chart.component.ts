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
  standalone: true,
  imports: [LayoutsComponent, FooterComponent, CommonModule, FormsModule]
})
export class ShoppingChartComponent implements OnInit {

  selectedAlamat: any = "Pilih Alamat Pengiriman";
  cart: any = [];
  harga: number = 0;
  biaya_kirim: number = 0;
  total: number = 0;
  provinsi: any[] = [];
  kota: any[] = [];
  alamat: any[] = []
  selectedProvinsi: any
  ekspedisi: any[] = []
  Ongkir: number = 0
  selectedEkspedisi: any
  selectKota: any
  selectProv: any
  paketPengiriman: any[] = []
  selectedPaketKirim: any = {}
  selectedLayananKirim: any = {}
  costOngkir: any[] = []
  SelectedOngkir: any
  constructor(
    private router: Router,
    private produkService: ProdukService
  ) { }

  ngOnInit(): void {
    this.reload();
    this.produkService.provinsi().subscribe(result => {
      this.provinsi = result.data.rajaongkir.results
    })
    this.reload_alamat();
    this.getEkspedisi()
  }

  handleChangeProvinsi(args: any): void {
    console.log(args)
    console.log(this.selectedProvinsi)
    this.setkota(this.selectedProvinsi)
  }

  setkota(id_provinsi: any) {
    this.produkService.kota(id_provinsi).subscribe(result => {
      this.kota = result.data.rajaongkir.results
    })
  }

  reload_alamat() {
    this.produkService.get_alamat().subscribe(result => {
      this.alamat = result.data
    })
  }

  reload() {
    this.produkService.getcart().subscribe(result => {
      this.cart = result.data
      this.hitung();
      console.log(result.data)
    })

  }

  hitung() {
    this.harga = 0
    this.cart.forEach((element: any) => {
      if (element.checked == '1') {
        this.harga = this.harga + (element.qty * element.product.harga)
      }
      this.total = this.harga + this.biaya_kirim
    });
  }

  updateQty(item: any, type: number): void {
    console.log(item, type);
    let c = item.checked;
    if (type == 1) {
      if (item.checked == '0') {
        item.checked = true
      } else {
        item.checked = false
      }
    }
    this.hitung();
    this.produkService.updatecart({
      id_cart: item.id_cart,
      qty: item.qty,
      checked: item.checked,
    }).subscribe(result => {
      // this.reload();
    })
  }

  updateQty_(item: any, type: number): void {
    this.produkService.updatecart({
      id_cart: item.id_cart,
      qty: item.qty,
      checked: item.checked,
    }).subscribe(result => {
      // this.reload();
    })
    this.hitung();
  }

  hapus(id_cart: number): void {
    this.produkService.hapuscart(id_cart).subscribe(result => {
      this.reload();
    })
  }

  onDoubleClick(args: any, almt: any): void {
    let close = document.getElementById('closeModal') as HTMLInputElement
    let alamat = document.getElementById('alamat_lengkap') as HTMLElement
    console.log(alamat.innerHTML)
    console.log(almt)
    this.selectKota = almt.id_kota
    this.selectProv = almt.id_provinsi
    this.selectedAlamat = alamat.innerHTML
    close.click()
  }

  getEkspedisi(): void {
    this.produkService.kurir().subscribe(result => {
      console.log(result)
      let pos = []
      pos.push(result.data.pos)
      let tiki = []
      tiki.push(result.data.tiki)
      let jne = []
      jne.push(result.data.jne)
      this.ekspedisi.push(...tiki, ...jne, ...pos)
      console.log(this.ekspedisi)
    })
  }

  handleChangeEkspedisi(args: any): void {
    console.log(args)
    console.log(this.selectedEkspedisi)
    let payload = {
      "origin": '1',
      "destination": "3",
      "weight": 3,
      "courier": this.selectedEkspedisi
    }

    this.produkService.cekOngkir(payload).subscribe(result => {
      console.log(result)
      this.paketPengiriman = result.data.rajaongkir.results
      result.data.rajaongkir.results.forEach((res: any) => {
        this.costOngkir.push(...res.costs)
      })
    })
    console.log("COSTONGKIR==>", this.costOngkir)
  }

  handleChangePaketKirim(args: any): void {
    console.log(this.selectedPaketKirim)
    // console.log(args.target.value)
  }

  handleChangeLayananKirim(args: any): void {
    console.log(this.selectedLayananKirim)
  }

  handleChangeOngkir(): void {
    this.biaya_kirim = this.SelectedOngkir.value
    this.hitung()
  }
}
