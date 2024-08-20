import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { UtilityService } from 'src/app/service/utility/utility.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  standalone:true,
  imports: [LayoutsComponent, FooterComponent,CommonModule],
  providers:[CurrencyPipe]
})
export class DetailProductComponent implements OnInit {

  pricePerItem = 799000;
  qty_value: number = 1;
  subtotal: number;
  id:any

  detail:any ;

  showSpinner:boolean = false
  

  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi  pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]


  constructor(
    private currencyPipe: CurrencyPipe,
    private produkService: ProdukService,
    private activedRoute: ActivatedRoute,
    private domsanitizer: DomSanitizer,
    private router:Router,
    private authenticationService:AuthenticationService,
    public layoutService:LayoutService,
    private utilityService:UtilityService
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

    this.isLogin()

  }

  isLogin():void{
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

  addcart():void{
    let data = {
      id_customer : 1,
      id_product : this.id,
      qty : this.qty_value
    }
    this.showSpinner = true
    this.produkService.addcart(data).subscribe(result=>{
      console.log(result);
        if(result.status=='success'){
          this.utilityService.onShowCustomAlert('success','Berhasil',result.message)
          .then(()=>{
            this.router.navigateByUrl('shoping-chart')
          })
        }else{
          this.utilityService.onShowCustomAlert('error',"Oops...",result.message)
        }
      this.showSpinner = false
     
    
    },error =>{
      console.error('Error:', error);
            this.utilityService.onShowCustomAlert('error', "Oops...", "Something went wrong!");

            // Hide the spinner in case of error
            this.showSpinner = false;
    });
  }


}
