import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthRequest = req.url.includes(`${environment.apiUser}/login`) || req.url.includes(`${environment.apiUser}/register`);
    
    const token = localStorage.getItem('authToken');
    
    if (token && !isAuthRequest) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
