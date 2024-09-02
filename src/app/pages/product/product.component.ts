import { CommonModule } from '@angular/common';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation } from 'src/app/animations/animations';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from "../footer/footer.component";
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { DropdownModule } from 'primeng/dropdown';
// import { CookieService } from 'src/app/service/cookie-service/cookie.service';
import { CookiesserviceService } from 'src/app/service/cookiesservice/cookiesservice.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone:true,
  imports: [
    LayoutsComponent,
    FooterComponent,
    CommonModule,
    DropdownModule
],
animations:[fadeInAnimation]
})
export class ProductComponent implements OnInit,OnDestroy {

  item:any =1

  stars = [1, 2, 3, 4, 5];

  items = [1,2,3,4,5,6,7,8]

  produk:any =[];

  sex: any[] = [
    {
  label: 'TERMAHAL', value: 'TERMAHAL'
  },
  {
    label: 'TERMURAH', value: 'TERMURAH'
    }
  ]

  destroy$ = new Subject<void>()

  selectedSex:any


  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]


  constructor(
    private router:Router,
    private produkService:ProdukService,
    public layoutService:LayoutService,
    private authenticationService:AuthenticationService,
    private cookieService:CookiesserviceService
  ){}

  ngOnInit(): void {
    this.produkService.getallproduk()
    .pipe(takeUntil(this.destroy$)).subscribe(result=>{
      console.log(result)
      this.produk = result.data
    });

    this.isLogin()
  }

  handleChangeUrutkan(args:any):void{
    console.log(args)
    let select = args.value.value
    if(select == 'TERMAHAL'){
      this.produk.sort((a:any,b:any):any=>{
        return parseInt(b.harga)-parseInt(a.harga)
      })
    }else if(select == 'TERMURAH'){
      this.produk.sort((a:any,b:any):any=>{
        return parseInt(a.harga)-parseInt(b.harga)
      })
    }
  }

  isLogin():void{
    const item = this.cookieService.get('BATIK_');
    let data: any;
    if (item) {
      data = JSON.parse(item);
    } else {
      data = {}; // or any default value you want to assign
    }
    if (this.cookieService.get('BATIK_')) {
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

  detail(id:any):void{
    this.router.navigateByUrl('product/'+id)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
