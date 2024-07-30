import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './pages/about/about.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist/src/angular-font-awesome.module';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { LoadingScreenComponent } from './pages/loading-screen/loading-screen.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { ProductComponent } from './pages/product/product.component';
import { LayoutsComponent } from "./components/layouts/layouts.component";
import { EventsComponent } from './pages/events/events.component';
import { EventRegisterComponent } from './pages/event-register/event-register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { ShoppingChartComponent } from './pages/shopping-chart/shopping-chart.component';
import { VideoplayerComponent } from './pages/videoplayer/videoplayer.component';
import { ListEventComponent } from './pages/list-event/list-event.component';



@NgModule({
  declarations: [
    AppComponent,
    LoadingScreenComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    LayoutsComponent,
    HttpClientModule,
    ReactiveFormsModule
],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
