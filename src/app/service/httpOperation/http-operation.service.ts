import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
// import { CookieService } from '../cookie-service/cookie.service';
import { CookiesserviceService } from '../cookiesservice/cookiesservice.service';

@Injectable({
  providedIn: 'root'
})
export class HttpOperationService {

  constructor(
    private _httpClient: HttpClient,
    private _utilityService:UtilityService,
    private cookieService:CookiesserviceService
  ) { }

  getRequest(url: string): Observable<any> {

    return this._httpClient.get<any>(url).pipe(
      map((result) => {
        if (!result.status) {
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
    const item = this.cookieService.get('BATIK_');
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
    console.log(headers)
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
    const item = this.cookieService.get('BATIK_');
    let token: any;

    if (item) {
      token = JSON.parse(item);
    } else {
      token = {}; // or any default value you want to assign
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token.bearer}`,
      'Accept':'application/json' 
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
      if(result.status){
        return result
      }
      else{
        return 0
      }
    }))
  }

  onDeleteRequest(url:any){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this._httpClient.delete<any>(url,{headers})
    .pipe(map((result:any)=>{
      if(result.status){
        return result
      }else{
        return 0
      }
    }))
  }




  handlingError(error:any):any{

  }
}
