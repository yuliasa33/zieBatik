import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService:MessageService) { }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  }

  showError(status:any,message:any) {
    this.messageService.add({severity:'error', summary: 'Error', detail:`${status} ${message}`});
  }

  showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Message Content'});
  }

  showWarn() {
    this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Message Content'});
  }
}
