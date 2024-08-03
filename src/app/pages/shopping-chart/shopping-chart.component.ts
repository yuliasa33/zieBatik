import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { OrderService } from 'src/app/service/order/order.service';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";
import { UtilityService } from 'src/app/service/utility/utility.service';

@Component({
  selector: 'app-shopping-chart',
  templateUrl: './shopping-chart.component.html',
  styleUrls: ['./shopping-chart.component.css'],
  standalone: true,
  imports: [LayoutsComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ShoppingChartComponent implements OnInit {

  selectedAlamat: any = "Pilih Alamat Pengiriman";
  cart: any = [];
  harga: number = 0;
  biaya_kirim: number = 0;
  total: number = 0;
  prov: any[] = [];
  city: any[] = [];
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
  berat: any = 1


  FormInputAlamat!: FormGroup


  constructor(
    private router: Router,
    private produkService: ProdukService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.reload();
    this.produkService.provinsi().subscribe(result => {
      this.prov = result.data.rajaongkir.results
    })
    this.reload_alamat();
    this.getEkspedisi()

    this.setAtributeTambahAlamat()
  }

  setAtributeTambahAlamat(): void {
    this.FormInputAlamat = this.formBuilder.group({
      nama_lengkap: [""],
      no_hp: [""],
      alamat_lengkap: [""],
      kota: [""],
      provinsi: [""],
      id_provinsi: [],
      id_kota: []
    })
  }

  handleChangeProvinsi(args: any): void {
    console.log(args)
    console.log(this.selectedProvinsi)
    this.setkota(this.selectedProvinsi)
  }

  setkota(id_provinsi: any) {
    this.produkService.kota(id_provinsi).subscribe(result => {
      this.city = result.data.rajaongkir.results
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
    console.log(args)
    this.selectKota = almt.id_kota
    this.selectProv = almt.id_provinsi
    this.selectedAlamat = args.target.innerText
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
      "weight": this.berat,
      "courier": this.selectedEkspedisi
    }

    this.produkService.cekOngkir(payload).subscribe(result => {
      console.log(result)
      this.paketPengiriman = result.data.rajaongkir.results
      // result.data.rajaongkir.results.forEach((res: any) => {
      //   this.costOngkir.push(...res.costs)
      // })
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

  handleChangeBerat(args: any): void {
    console.log(args.target.value)
    this.berat = args.target.value
  }

  handleClickBayar(args: any): void {
    this.orderService.OnPayMidtrans({
      "id_customer": 1,
      "id_alamat_customer": 1,
      "total": args,
      "total_qty": 1,
      "id_type_payment": 1,
      "data_order": [
        {
          "id_product": 1,
          "qty": 2,
          "subtotal": 2000
        }
      ]
    }).subscribe((result: any) => {
      window.snap.pay(result.snap.token, {
        onSuccess: function (result: any) {
          console.log('Success:', result);
        },
        onPending: function (result: any) {
          console.log('Pending:', result);
        },
        onError: function (result: any) {
          console.log('Error:', result);
        },
        onClose: function () {
          console.log('Customer closed the popup without finishing the payment');
        }
      })
    })
  }

  handleTambahAlamat(Form: any): void {

    const nama_prov = this.prov.find((el: any) => el.province_id === Form.id_provinsi)
    const nama_city = this.city.find((el: any) => el.city_id === Form.id_kota)
    Form.provinsi = nama_prov.province
    Form.kota = nama_city.city_name
    console.log("FORM ==> ", Form)
    this.produkService.tambah_alamat(Form).subscribe(result => {
      console.log(result)
      if (result.status === "success") {
        this.onResetForm()
        this.reload_alamat()
      } else {
        this.utilityService.onShowCustomAlert('error', 'Oops...', result.message)
      }
    })
  }

  hapusAlamat(args: any): void {
    let close = document.getElementById('closeModal') as HTMLInputElement
    let open = document.getElementById('openModal') as HTMLElement
    close.click()
    this.utilityService.onShowConfirmationAlert('warning', 'Informasi', 'Apakah anda akan menghapus alamat ini ??', () => {
      open.click()
    }, () => { open.click() })
  }

  onResetForm(): void {
    this.FormInputAlamat.reset()
  }
  //   let payload = {
  //     "nomor_invoice INV-004",
  //     "payment" : args
  //   }
  //   this.orderService.OnPayMidtrans(payload).subscribe((result:any)=>{
  //     const snapToken = result.snapToken


  //      // Call the Snap Pay UI
  //      window.snap.pay(snapToken, {
  //       onSuccess: function(result:any) {
  //         console.log('Success:', result);
  //       },
  //       onPending: function(result:any) {
  //         console.log('Pending:', result);
  //       },
  //       onError: function(result:any) {
  //         console.log('Error:', result);
  //       },
  //       onClose: function() {
  //         console.log('Customer closed the popup without finishing the payment');
  //       }
  //     })
  //   })
  // }

  get nama_lengkap(): AbstractControl { return this.FormInputAlamat.get('nama_lengkap') as AbstractControl }
  get alamat_lengkap(): AbstractControl { return this.FormInputAlamat.get('alamat_lengkap') as AbstractControl }
  get no_hp(): AbstractControl { return this.FormInputAlamat.get('no_hp') as AbstractControl }
  get kota(): AbstractControl { return this.FormInputAlamat.get('kota') as AbstractControl }
  get provinsi(): AbstractControl { return this.FormInputAlamat.get('provinsi') as AbstractControl }


}
