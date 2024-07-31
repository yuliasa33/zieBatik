import { Component , OnInit,AfterViewInit } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { AboutComponent } from '../about/about.component';
import { fadeInAnimation, fadeInAnimationForComponent } from 'src/app/animations/animations';
import { FooterComponent } from "../footer/footer.component";
import { type CarouselItem, type CarouselOptions, type CarouselInterface, Carousel } from "flowbite";
import { CommonModule } from '@angular/common';
import { LayoutService } from 'src/app/service/layout-service/layout.service';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { EventsComponent } from "../events/events.component";
import * as Aos from 'aos';
import { AuthenticationService } from 'src/app/service/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { ProdukService } from 'src/app/service/produk/produk.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:true,
  imports: [
    LayoutsComponent,
    AboutComponent,
    FooterComponent,
    CommonModule,
    TestimonialComponent,
    GalleryComponent,
    EventsComponent
],
  animations:[fadeInAnimation,fadeInAnimationForComponent]
})
export class HomeComponent implements OnInit,AfterViewInit {

  currentSlide = 0;
  interval: any;

  event:any[] = []

  navbarMenu:any[] = [
    {label:'Home'},
    {label:'About'},
    {label:'Pricing'},
    {label:'Service'},
  ]

  loopitem:any[] = []


  constructor(public layoutService:LayoutService,
              private authenticationService:AuthenticationService,
              private router:Router,
              private produkService:ProdukService,
              private domsanitizer: DomSanitizer,
  ){
    document.addEventListener('DOMContentLoaded', () => {
    const items: CarouselItem[] = [
      {
          position: 0,
          el: document.getElementById('carousel-item-1') as HTMLElement
      },
      {
          position: 1,
          el: document.getElementById('carousel-item-2') as HTMLElement
      },
      {
          position: 2,
          el: document.getElementById('carousel-item-3') as HTMLElement
      },
      {
          position: 3,
          el: document.getElementById('carousel-item-4') as HTMLElement
      },
  ] ;
  
  const options: CarouselOptions = {
      defaultPosition: 1,
      interval: 3000,
      
      indicators: {
          activeClasses: 'bg-white dark:bg-gray-800',
          inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
          items: [
              {
                  position: 0, 
                  el: document.getElementById('carousel-indicator-1') as HTMLElement
              },
              {
                  position: 1,
                  el: document.getElementById('carousel-indicator-2') as HTMLElement
              },
              {
                  position: 2,
                  el: document.getElementById('carousel-indicator-3') as HTMLElement
              },
              {
                  position: 3,
                  el: document.getElementById('carousel-indicator-4') as HTMLElement
              },
          ]
      },
    }

    const carouselElement = document.getElementById('carousels') as HTMLElement;
    const carousel: CarouselInterface = new Carousel(carouselElement,items, options);
    carousel.cycle()
  })
  }

  ngOnInit(): void {
    console.log(this.layoutService.showSidebar$.subscribe(result=>{
      console.log(result)
    }))
    this.startLoop();
    Aos.init()
    console.log(this.authenticationService.isLoginState)
    this.getAllProdukDashboard()
  }

  getAllProdukDashboard():void{
    this.produkService.getAllDashbord().subscribe(result=>{
      console.log(result)
      result.data.product.forEach((result:any)=>{
        result.deskripsi_product = this.domsanitizer.bypassSecurityTrustHtml(result.deskripsi_product)
      })
      result.data.event.forEach((el:any)=>{
        el.deskripsi = this.domsanitizer.bypassSecurityTrustHtml(el.deskripsi)
      })
      this.event = result.data.event
      this.loopitem = result.data.product
    })
  }

  ngAfterViewInit(): void {
    Aos.refresh()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  startLoop(): void {
    this.interval = setInterval(() => {
      this.toggleSlides();
    }, 8000);
  }

  toggleSlides(): void {
    this.currentSlide = this.currentSlide === 0 ? 1 : 0;
  }

  reinitLoop(time: number): void {
    clearInterval(this.interval);
    setTimeout(() => {
      this.startLoop();
    }, time);
  }

  sliderButton1(): void {
    this.currentSlide = 0;
    this.reinitLoop(4000);
  }

  sliderButton2(): void {
    this.currentSlide = 1;
    this.reinitLoop(4000);
  }

  handleClickLihatLebihBanyak():void{
    this.router.navigateByUrl('Product')
  }

  handleClickLihatOpsi(args:any):void{
    this.router.navigate(['product/',args])
  }

}
