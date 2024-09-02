import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { CookiesserviceService } from "../service/cookiesservice/cookiesservice.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private cookieService:CookiesserviceService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const WebApiUrl = httpRequest.url.startsWith(`${environment.url}`);

        const userData = this.cookieService.get("BATIK_");

        if (userData && WebApiUrl) {
            const UserData = JSON.parse(userData)

            const modifiedRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${UserData.bearer}`
                }
            });
            return next.handle(modifiedRequest);
        } else {
            return next.handle(httpRequest);
        }
    }
}