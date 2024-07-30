import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  constructor(private httpOperationService:HttpOperationService,
    private utilityService:UtilityService,
    private router:Router
){}
  
  getallproduk():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'product/getall');
  }

  getdetailproduk(id:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'product/getById/'+id);
  }

  addcart(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'cart/create',data);
  }

}
