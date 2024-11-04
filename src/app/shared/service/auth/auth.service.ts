import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly apiUrl = `${environment.apiUser}`;
  private readonly tokenKey = 'authToken';

  constructor(private readonly http: HttpClient) {}

  login(login: Login): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, login).pipe(
      map(response => {
        this.setToken(response.token);
        return response.token;
      })
    );
  }

  register(user: User): Observable<string> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, user).pipe(
      map(response => {
        this.setToken(response.token);
        return response.token;
      })
    );
  }

  registerAdmin(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin`, user);
  }

  setRole(data: { id: number; role: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/admin/role`, data);
  }


  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.role || null;
    }
    return null;
  }
}
