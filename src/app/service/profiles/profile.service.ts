import { Injectable } from '@angular/core';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { ToastService } from '../taost/toast.service';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpOperationService:HttpOperationService,
              private toastService:ToastService
  ) { }

  getOrderByIdCustomer():Observable<any>{
    return this.httpOperationService.getRequestwithToken(environment.url+'order/getAllOrderCustomer')
    .pipe(catchError((error:any):any=>{
      this.toastService.showError(error.status,error.message)
    }))
  }

}
