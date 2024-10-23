import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService  {
  
  /*constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return next.handle(clonedRequest);
    }
    
    return next.handle(req);
  }*/
    private readonly apiUrl = `${environment.apiUser}/login`;  

    constructor(private readonly http: HttpClient) { }
  
    actualizeAuth(): Observable<string> {
      const userData = { email: "johndos@example.com", password: "12345" };
      return this.http.post<string>(this.apiUrl, userData);
    }
    
}
