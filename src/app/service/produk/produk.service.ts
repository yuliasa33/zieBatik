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
  
  getAllDashbord():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'dashboard/getall')
  }

  getallproduk():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'product/getall');
  }

  getdetailproduk(id:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'product/getById/'+id);
  }

  addcart(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'cart/create',data);
  }

  getcart():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'cart/getall/1');
  }
  hapuscart(id:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'cart/delete/'+id);
  }
  updatecart(data:any):Observable<any>{
    return this.httpOperationService.onPutRequest(environment.url+'cart/update',data);
  }
  tambah_alamat(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'cart/update',data);
  }
  get_alamat():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'customer/getAllAlamatCustomer/1');
  }
  hapus_alamat():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'cart/update');
  }
  provinsi():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'rajaongkir/getProvinsi');
  }
  kota(id_provinsi:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'rajaongkir/getKota/'+id_provinsi);
  }
  kurir():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'rajaongkir/getKurir');
  }

  cekOngkir(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'rajaongkir/getCost',data)
  }

  getevent():Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'event/getall');
  }

  geteventbyid(id:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'event/getById/'+id);
  }

}
