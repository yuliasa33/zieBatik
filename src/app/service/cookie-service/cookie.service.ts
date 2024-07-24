import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private cookieService:CookieService) { }

  check(key: string): boolean {
    return this.cookieService.check(key);
}

get(key: string): string {
    return this.cookieService.get(key)
}

set(key: string, value: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    this.cookieService.set(key, value);
}

delete(key: string): void {
    this.cookieService.delete(key);
}

deleteAll(): void {
    this.cookieService.deleteAll();
}
}
