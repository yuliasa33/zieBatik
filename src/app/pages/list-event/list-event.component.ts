import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutsComponent } from 'src/app/components/layouts/layouts.component';
import { ProdukService } from 'src/app/service/produk/produk.service';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
  standalone:true,
  imports:[LayoutsComponent,FooterComponent,CommonModule]
})
export class ListEventComponent implements OnInit{
  constructor(
    private router:Router,
    private produkService:ProdukService
  ){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  event:any[] = []

  items = {}

  detail(id:any):void{
    this.router.navigateByUrl('product/'+id)
  }

  getall(args:any):void{
    this.produkService.getevent().subscribe(result=>{
      this.event = result.data
    })
  }

}
