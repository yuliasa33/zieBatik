import { Injectable } from '@angular/core';
import { HttpOperationService } from '../httpOperation/http-operation.service';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ToastService } from '../taost/toast.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpOperationService: HttpOperationService,
    private toastService: ToastService
  ) { }

  PostdaftarEvent(data: any): Observable<any> {
    return this.httpOperationService.onPostRequest(environment.url + 'register_event/customerRegisterEvent', data).
      pipe(catchError((error: any): any => {
        console.log(error)
        this.toastService.showError(error.status, error.message)
      }))
  }

  getByIdEvent(id_event: any): Observable<any> {
    return this.httpOperationService.getRequest(environment.url + `event/getById/${id_event}`)
      .pipe(catchError((error: any): any => {
        this.toastService.showError(error.status, error.message)
      }))
  }

}
