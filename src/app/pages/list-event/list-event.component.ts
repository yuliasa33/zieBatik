import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from '../footer/footer.component';
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
  standalone:true,
  imports:[LayoutsComponent,FooterComponent,CommonModule]
})
export class ListEventComponent implements OnInit{

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
  ){

  }
  ngOnInit(): void {
    this.getall();  
    this.isLogin()
  }


  event:any[] = []

  items = {}

  detail(id:any):void{
    this.router.navigateByUrl('event-register/'+id)
  }

  getall():void{
    this.produkService.getevent().subscribe(result=>{
      this.event = result.data
    })
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

}
