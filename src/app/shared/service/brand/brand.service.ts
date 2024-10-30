import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Brand } from '../../models/brand';
import { BrandResponse } from '../../models/brandResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private readonly apiUrl = `${environment.apiStock}/brand`;
  
  // Aquí se establece el token
  private readonly bearer: string = `Bearer ${environment.token}`;

  constructor(private readonly http: HttpClient) { }

  createBrand(brandData: { name: string; description: string }): Observable<Brand> {
    const headers = new HttpHeaders({
      Authorization: this.bearer 
    });
    return this.http.post<Brand>(this.apiUrl, brandData, { headers });
  }

  getBrands(page: number, size: number, order: string = 'asc'): Observable<BrandResponse> {
    const headers = new HttpHeaders({
      Authorization: this.bearer 
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<BrandResponse>(this.apiUrl, { headers, params });
  }

  private readonly brandSubject = new BehaviorSubject<Brand[]>([]);
  brands$ = this.brandSubject.asObservable();

  getBrandList(): Observable<Brand[]> {
    const headers = new HttpHeaders({
      Authorization: this.bearer
    });
    return this.http.get<Brand[]>(this.apiUrl + '/list', { headers }).pipe(
      tap(brands => this.brandSubject.next(brands))
    );
  }
}
