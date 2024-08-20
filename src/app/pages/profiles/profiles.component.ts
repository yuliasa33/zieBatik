import { Component, OnInit } from '@angular/core';
import { LayoutsComponent } from "../../components/layouts/layouts.component";
import { UtilityService } from 'src/app/service/utility/utility.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/service/profiles/profile.service';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  standalone:true,
  imports: [LayoutsComponent,CommonModule,InputTextModule]
})
export class ProfilesComponent implements OnInit {

  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]

  Data:any[] = []

  constructor(private utilityService:UtilityService,
              private router:Router,
              private profileService:ProfileService,
              public layoutService:LayoutService,
              private authenticationService:AuthenticationService,
  ){

  }

  ngOnInit(): void {
    this.checkIsLogin()
    this.getData()
    this.isthisLogin()
  }

  onUpperCase(data:string){
    return data.toUpperCase()
  }

  getData():void{
    this.profileService.getOrderByIdCustomer().subscribe((result:any)=>{
      console.log(result)
      this.Data = result.data
    })
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

}
