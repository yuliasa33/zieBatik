import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public showSidebar$ = new BehaviorSubject<boolean>(false)
  sidebarState = this.showSidebar$.asObservable()

  constructor() { }
  changeState(newState: boolean) {
    this.showSidebar$.next(newState);
  }

  // Method to toggle the current value of the BehaviorSubject
  toggleState() {
    this.showSidebar$.next(!this.showSidebar$.value);
  }
}
