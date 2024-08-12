import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  onShowCustomAlert(icons: any, title: any, text: any): Promise<any> {
    return Swal.fire({
      icon: icons,
      title: title,
      text: text,
    })
  }

  onShowConfirmationAlert(icons: any, title: any, text: any, actionYes: () => any, actionNo: () => any) {
    return Swal.fire({
      icon: icons,
      title: title,
      text: text,
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    }).then((result: any) => {
      if (result.isConfirmed) {
        return actionYes()
      } else {
        return actionNo()
      }
    })
  }

  onShowLoading(): Promise<any> {
    let timerInterval: any;

    return Swal.fire({
      title: 'Loading...',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      showCancelButton: false,
      willOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          const content = Swal.getHtmlContainer();
          if (content) {
            const b: any = content.querySelector('b');

            if (b) {
              b.textContent = Swal.getTimerLeft();
            }
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((alertResponse) => {
      if (alertResponse.dismiss === Swal.DismissReason.timer) {

      }
    });
  }

  onShowLoadingBeforeSend(): void {
    Swal.fire({
      title: 'Loading...',
      showCancelButton: false,
      showConfirmButton: false,
      showDenyButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }


}
