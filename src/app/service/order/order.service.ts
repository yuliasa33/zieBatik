import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpOperationService } from '../httpOperation/http-operation.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpOperationService:HttpOperationService) { }

  OnPayMidtrans(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'order/create',data)
  }

}
