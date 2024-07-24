import { Component,OnInit,AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { initFlowbite } from 'flowbite';
import { LoadingService } from './service/loading/loading.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,AfterViewInit{
  title = 'projectmbatik';
  loading$?: Observable<boolean>;
  constructor(private loadingService:LoadingService){}

  ngOnInit(): void {
   this.loading$ = this.loadingService.loading$
    initFlowbite()
  }

  ngAfterViewInit(): void {
    AOS.init()
     AOS.refresh()
  }

}
