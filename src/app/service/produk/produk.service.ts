import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { UtilityService } from '../utility/utility.service';
import { MessageService } from 'primeng/api';
import { ToastService } from '../taost/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  constructor(private httpOperationService:HttpOperationService,
    private utilityService:UtilityService,
    private router:Router,
    private toastService:ToastService
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
    return this.httpOperationService.getRequestwithToken(environment.url+'cart/getall');
  }
  hapuscart(id:any):Observable<any>{
    return this.httpOperationService.getRequest(environment.url+'cart/delete/'+id);
  }
  updatecart(data:any):Observable<any>{
    return this.httpOperationService.onPutRequest(environment.url+'cart/update',data);
  }
  tambah_alamat(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'customer/tambahAlamat',data);
  }
  get_alamat():Observable<any>{
    return this.httpOperationService.getRequestwithToken(environment.url+'customer/getAllAlamatCustomer');
  }
  hapus_alamat(id_alamat_customer:any):Observable<any>{
    return this.httpOperationService.onDeleteRequest(environment.url+`customer/deleteAlamatCustomer/${id_alamat_customer}`)
    .pipe(catchError((error:any):any=>{
      this.toastService.showError(error.status,error.message)
    }));
  }

  Edit_alamat(data:any):Observable<any>{
    return this.httpOperationService.onPutRequest(environment.url+'customer/updateAlamatCustomer',data)
    .pipe(catchError((error:any):any=>{
      this.toastService.showError(error.status,error.message)
    }));
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
