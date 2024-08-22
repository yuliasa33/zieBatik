import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { OrderService } from 'src/app/service/order/order.service';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";
import { UtilityService } from 'src/app/service/utility/utility.service';
import Swal from 'sweetalert2';
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

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
  isSmallScreen?:boolean
  largeScreen?:boolean

  selectedDestination:any

  FormInputAlamat!: FormGroup

  FormInputAlamatState: 'Tambah' | 'Edit' ='Tambah'

  showSpinner:boolean = false

  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]


  constructor(
    private router: Router,
    private produkService: ProdukService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    public layoutService:LayoutService,
              private authenticationService:AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.reload();
    this.produkService.provinsi().subscribe(result => {
      this.prov = result.data.rajaongkir.results
    })
    this.reload_alamat();
    this.getEkspedisi()

    this.setAtributeTambahAlamat()
    this.checkScreenSize()
    this.checkIsLogin()
    this.isthisLogin()
  }

  setAtributeTambahAlamat(): void {
    this.FormInputAlamat = this.formBuilder.group({
      id_alamat_customer: [null],
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

    this.selectedDestination = almt.id_kota

    this.selectKota = almt.id_kota

    this.selectProv = almt.id_provinsi

    this.selectedAlamat = args.target.innerText

    console.log('almt',almt)

    console.log('args',args)

    close.click()
  }

  onPilihAlamat(args:any,almt:any):void{
    let alamat = document.getElementById('alamat_lengkap') as HTMLElement
    let close = document.getElementById('closeModal') as HTMLInputElement

    this.selectedAlamat = alamat.innerText

    this.selectedDestination = almt.id_kota

    console.log('almt',almt)

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
    if(this.selectedAlamat == "Pilih Alamat Pengiriman"){
      this.utilityService.onShowCustomAlert('warning','Perhatian','Alamat tujuan belum di isi')
    }else{
      
      let payload = {
        "origin": '398',
        "destination": this.selectedDestination,
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
      
    }
    
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
    this.showSpinner = true
    if(!this.selectedEkspedisi){
      this.utilityService.onShowCustomAlert('warning','Perhatian','Silahkan pilih ongkos kirim terlebih dahulu').then(()=>{
        this.showSpinner = false
      })
    }else{
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
          
          },
        })
        this.showSpinner = false
      })
    }
    
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

      }else {
        this.utilityService.onShowCustomAlert('error', 'Oops...', result.message)
      }
    })
  }

  hapusAlamat(args: any): void {

    let close = document.getElementById('closeModal') as HTMLInputElement

    let open = document.getElementById('openModal') as HTMLElement

    console.log('DELETE ALAMAT ==>',args)
    
    close.click()

    this.utilityService.onShowConfirmationAlert('warning', 'Informasi', 'Apakah anda akan menghapus alamat ini ??', () => {
      this.requestHapusAlamat(args)
    }, () => { open.click() })
  }

  requestHapusAlamat(id_alamat_customer:any):void{
    let open = document.getElementById('openModal') as HTMLElement
    
    this.utilityService.onShowLoadingBeforeSend()
   
    this.produkService.hapus_alamat(id_alamat_customer).subscribe((result:any)=>{
   
      if(result.status == 'success'){
   
        Swal.close()
   
        this.utilityService.onShowCustomAlert('success','Berhasil',result.message).then(()=>{
   
          open.click()
   
          this.reload_alamat()
        })
      }else{
   
        Swal.close()
   
        this.utilityService.onShowCustomAlert('error','Oops...',result.message)
   
      }
    })
  }


  EditAlamat(args:any):void{
    console.log("EDIT==>",args)

    delete args.id_customer

    delete args.created_at

    delete args.updated_at

    this.FormInputAlamatState = 'Edit'

    this.setkota(args.id_provinsi)

    this.FormInputAlamat.setValue(args)
  }

  HandleEditAlamat(args:any):void{
    // let payload = {
    //     id_alamat_customer : 1,
    //     nama_lengkap : "rahmat",
    //     alamat_lengkap : "Jl. Bersama sama",
    //     no_hp : "123123",
    //     kota : "bandungan",
    //     provinsi : "Jawa Tengah",
    //     id_kota : 1,
    //     id_provinsi: 2
    // }
    let close = document.getElementById('closeModal') as HTMLInputElement
    
    let open = document.getElementById('openModal') as HTMLElement
    
    close.click()
    
    this.utilityService.onShowLoadingBeforeSend()
    
    console.log("HANDLE EDIT ALAMAT ==>",args)
    
    this.produkService.Edit_alamat(args).subscribe(result=>{
    
      if(result.status == 'success'){
    
        Swal.close()
    
        this.utilityService.onShowCustomAlert('success','Berhasil',result.message)
        .then(()=>{
    
          this.reload_alamat()
    
          open.click()
    
          this.onResetForm()
        })
      }else{
    
        Swal.close()
    
        this.utilityService.onShowCustomAlert('error','Oops...',result.message)
        .then(()=>{
    
          open.click()
    
        })
      }
    })
  }


  onResetForm(): void {
    
    this.FormInputAlamat.reset()
    
    this.FormInputAlamatState = 'Tambah'
  
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
    if (window.innerWidth >= 768) {
      this.largeScreen = true
    } else {
      this.largeScreen = false
    }
  }

  checkIsLogin():void{
    const isLogin = localStorage.getItem('BATIK_')
    console.log(isLogin)
    if(isLogin == null){
      this.utilityService.onShowCustomAlert('warning','Perhatian','Maaf Anda Belum Login')
      .then(()=>{
        this.router.navigateByUrl('')
      })
    }
  }

  isthisLogin():void{
    const item = localStorage.getItem('BATIK_');
    let data: any;
    if (item) {
      data = JSON.parse(item);
    } else {
      data = {}; // or any default value you want to assign
    }
    if (localStorage.getItem('BATIK_')) {
      this.navbarMenu = [
        { label: 'Home',icon:'pi pi-home' },
        // { label: 'About', },
        { label: 'Product',icon:'pi pi-receipt' },
        { label: 'Events',icon:'pi pi-flag' },
        {
          icon: 'pi pi-user', label: data?.nama, children: [
            { label: 'Order Status', icon: 'pi pi-shopping-bag' },
            { label: 'Log Out', icon: 'pi pi-power-off' }
          ]
        },

      ]
    }

  }

  handleClickSidbar(args:any):void{
    console.log(args)
    let select = args
    if (select == 'Product') {
      this.router.navigateByUrl('Product')
    }
    if (select == 'Home') {
      this.router.navigateByUrl('')
    }

    if (select == 'Events') {
      this.router.navigateByUrl('list-event')
    }

    if (select == 'Log Out') {
      this.authenticationService.SignOut()
    } if (select == 'Order Status') {
      this.router.navigateByUrl('profil')
    }

    if (select == 'Login') {
      this.router.navigateByUrl('login')
    }

  }

  get nama_lengkap(): AbstractControl { return this.FormInputAlamat.get('nama_lengkap') as AbstractControl }
  get alamat_lengkap(): AbstractControl { return this.FormInputAlamat.get('alamat_lengkap') as AbstractControl }
  get no_hp(): AbstractControl { return this.FormInputAlamat.get('no_hp') as AbstractControl }
  get kota(): AbstractControl { return this.FormInputAlamat.get('kota') as AbstractControl }
  get provinsi(): AbstractControl { return this.FormInputAlamat.get('provinsi') as AbstractControl }


}
