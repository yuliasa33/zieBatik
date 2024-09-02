import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from './pages/loading-screen/loading-screen.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { LayoutsComponent } from "./components/layouts/layouts.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { VisitUsComponent } from './pages/visit-us/visit-us.component';



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
    ReactiveFormsModule,
    ToastModule,
    DropdownModule
],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true},
    MessageService
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
