import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true
})
export class GalleryComponent implements AfterViewInit {

  @ViewChild('mainSlider') mainSliderElement!: ElementRef;
  @ViewChild('navSlider') navSliderElement!: ElementRef;


  mainSlider!: Swiper;
  navSlider!: Swiper;
  interleaveOffset = 0.5;

  ngAfterViewInit(): void {
    this.initMainSlider();
    this.initNavSlider();
  }

  initMainSlider() {
    this.mainSlider = new Swiper('.main-slider', {
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000
      },
      loopAdditionalSlides: 10,
      grabCursor: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        init: () => {
          this.mainSlider?.autoplay.stop();
        },
        // imagesReady: () => {
        //   this.mainSlider.el.classList.remove('loading');
        //   return this.mainSlider.autoplay.start();
        // },
        slideChangeTransitionEnd: () => {
          const captions = this.mainSlider.el.querySelectorAll('.caption');
          captions?.forEach((caption: any) => caption?.classList.remove('show'));
          this.mainSlider.slides[this.mainSlider.activeIndex].querySelector('.caption')?.classList.add('show');
        },
        progress: () => {
          for (let i = 0; i < this.mainSlider?.slides.length; i++) {
            const swiperSlide = this.mainSlider?.slides[i] as any; // Cast to 'any' to access Swiper properties
            const slideProgress = swiperSlide.progress || 0;
            const innerOffset = this.mainSlider.width * this.interleaveOffset;
            const innerTranslate = slideProgress * innerOffset;
            const slideBgImg = swiperSlide.querySelector('.slide-bgimg');
            if (slideBgImg) {
              slideBgImg.style.transform = `translateX(${innerTranslate}px)`;
            }
          }
        },
        touchStart: () => {
          for (let i = 0; i < this.mainSlider.slides.length; i++) {
            this.mainSlider.slides[i].style.transition = '';
          }
        },
        setTransition: (swiper:Swiper,speed: number) => {
          // for (let i = 0; i < this.mainSlider.slides.length; i++) {
          //   this.mainSlider.slides[i].style.transition = `${speed}ms`;
          //   this.mainSlider.slides[i].querySelector('.slide-bgimg').style.transition = `${speed}ms`;
          // }
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = `${speed}ms`;
            const slideBgImg:any = swiper.slides[i].querySelector('.slide-bgimg');
            if (slideBgImg) {
              slideBgImg.style.transition = `${speed}ms`;
            }
          }
        }
      }
    });
  }

  initNavSlider() {
    this.navSlider = new Swiper('.nav-slider', {
      loop: true,
      loopAdditionalSlides: 10,
      speed: 1000,
      spaceBetween: 5,
      slidesPerView: 5,
      centeredSlides: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
      direction: 'vertical',
      on: {
        // imagesReady: () => {
        //   this.navSlider.el.classList.remove('loading');
        // },
        click: () => {
          this.mainSlider.autoplay.stop();
        }
      }
    });

    this.mainSlider.controller.control = this.navSlider;
    this.navSlider.controller.control = this.mainSlider;
  }
}
