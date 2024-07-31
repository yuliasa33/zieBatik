import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpOperationService:HttpOperationService) { }

  OnPayMidtrans(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+'order/getSnap',data)
  }

}
