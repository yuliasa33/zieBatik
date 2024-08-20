import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { LayoutService } from 'src/app/service/layout-service/layout.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
  , schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutsComponent implements OnInit {

  isScrolled?: boolean = false
  User: any
  ShowDropdown: any = false

  isSmallScreen?: boolean;
  largeScreen?: boolean
  navbarMenu: any[] = [
    { label: 'Home', icon: 'pi pi-home' },
    { label: 'Product', icon: 'pi pi-receipt' },
    { label: 'Events', icon: 'pi pi-flag' },
    { label: 'Login', icon: 'pi pi-user' },
  ]

  isShowSidebar:boolean = false
  
  

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50; // Adjust this value as needed
  }


  constructor(public layoutService: LayoutService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.checkScreenSize()
  }

  ngOnInit(): void {

    this.isScrolled = window.scrollY > 50
    const item = localStorage.getItem('BATIK_');
    let data: any;

    if (item) {
      data = JSON.parse(item);
    } else {
      data = {}; // or any default value you want to assign
    }
    if (localStorage.getItem('BATIK_')) {
      this.navbarMenu = [
        { label: 'Home', },
        // { label: 'About', },
        { label: 'Product', },
        { label: 'Events', },
        {
          icon: 'pi pi-user', label: data?.nama, children: [
            { label: 'Profiles', icon: 'pi pi-user' },
            { label: 'Log Out', icon: 'pi pi-power-off' }
          ]
        },

      ]
    }


  }

  toggleDropdown(): void {
    this.ShowDropdown = !this.ShowDropdown
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
    if (window.innerWidth >= 768) {
      this.largeScreen = true
    } else {
      this.largeScreen = false
    }
  }

  toggleSidebar() {
    // this.showSidebar$ = !this.showSidebar$;
    // console.log(this.showSidebar$)
     this.layoutService.toggleState()
    // this.isShowSidebar = !this.isShowSidebar
    // console.log(this.isShowSidebar)
  }

  handleClickNavbar(args: any): void {
    console.log("handleClickNavBar==>", args.target.innerText)
    let select = args.target.innerText
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
    }

    if (select == 'Login') {
      this.router.navigateByUrl('login')
    }

  }

  handleSignOut(): void {
    this.authenticationService.SignOut()
  }

  handleClickProfiles():void{
    this.router.navigateByUrl('profil')
  }

  onClickChart(): void {
    this.router.navigateByUrl('shoping-chart')
  }

  handleClickSidbar(args:any):void{
    console.log(args)
  }

}
