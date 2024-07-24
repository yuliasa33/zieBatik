import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from '../utility/utility.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpOperationService {

  constructor(
    private _httpClient: HttpClient,
    private _utilityService:UtilityService
  ) { }

  getRequest(url: string): Observable<any> {

    return this._httpClient.get<any>(url).pipe(
      map((result) => {
        if (!result.responseResult) {
          this._utilityService.onShowCustomAlert('error','Oops...',result.message)
        }

        return result;
      }),
      catchError((error: any) => {
        this.handlingError(error);
        throw error;
      })
    )
  }

  getRequestwithToken(url:any):Observable<any>{
    const item = localStorage.getItem('BATIK_');
    let data: any;

    if (item) {
      data = JSON.parse(item);
    } else {
      data = {}; // or any default value you want to assign
    }
    const headers = new HttpHeaders({
      'Accept':'aplication/json',
      'Authorization':`Bearer ${data.token}` 
    })

    return this._httpClient.get(url,{headers})
    .pipe(map(res=>{
      if(res){
        return res
      }else{
        return 0
      }
    }))
  }

  onPostRequest(url:any,data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this._httpClient.post<any>(url,data,{headers})
    .pipe(map((result:any)=>{
      if(result.status == "success"){
        return result
      }
      else{
        return 0
      }
    }))
  }

  onPutRequest(url:any,data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this._httpClient.put<any>(url,data,{headers})
    .pipe(map((result:any)=>{
      if(result.responseResult){
        return result
      }
      else{
        return 0
      }
    }))
  }




  handlingError(error:any):any{

  }
}
