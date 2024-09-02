import { TitleCasePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { UtilityService } from '../utility/utility.service';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
import { ToastService } from '../taost/toast.service';
import { CookiesserviceService } from '../cookiesservice/cookiesservice.service';
// import { CookieService } from '../cookie-service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLogin$ = new BehaviorSubject<any>(false)
  isLoginState = this.isLogin$.asObservable()

  constructor(private httpOperationService:HttpOperationService,
              private utilityService:UtilityService,
              private router:Router,
              private toastService:ToastService,
              private cookieService:CookiesserviceService
  ){

  }

  SignInService(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(`${environment.url}customer/login`,data)
    .pipe(
      tap((result) => {
        console.log(result)
        if (result.status =='success') {
            const data = {
              id_customer:result.user.id_customer,
              nama: result.user.nama,
              email: result.user.email,
              phone: result.user.phone,
              gender:result.user.gender,
              image: result.user.image,
              bearer:result.authorisation.token,
              type:result.authorisation.type,
            }
            this.isLogin$.next(true)
            this.handleSignIn(data);
        }
    }),
      catchError((error:any):any=>{
      this.utilityService.onShowCustomAlert('error','Oops...',error.message)
    }))
  }

  SignOut():void{
    this.cookieService.deleteAll()
    this.utilityService.onShowCustomAlert('success','Berhasil','LogOut Success')
    .then(()=>{
      this.router.navigateByUrl('')
      window.location.reload()
    })
    
  }


  Register(data:any):Observable<any>{
    return this.httpOperationService.onPostRequest(environment.url+`customer/register`,data)
    .pipe(catchError((error:any):any=>{
      this.toastService.showError(error.status,error.message)
    }))
  }


   handleSignIn(data:any):void{
    this.cookieService.deleteAll()
    this.cookieService.set("BATIK_",JSON.stringify(data));
  }

}
