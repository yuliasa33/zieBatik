import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor() { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const WebApiUrl = httpRequest.url.startsWith(`${environment.url}`);

        const userData = localStorage.getItem("BATIK_");

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