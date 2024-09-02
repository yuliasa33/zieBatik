import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})
export class CookiesserviceService {

  constructor(private cookiesService:CookieService) { }

  check(key: string): boolean {
    return this.cookiesService.check(key);
}

get(key: string): string {
    return this.cookiesService.get(key)
}

set(key: string, value: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    this.cookiesService.set(key, value);
}

delete(key: string): void {
    this.cookiesService.delete(key);
}

deleteAll(): void {
    this.cookiesService.deleteAll();
}
}
