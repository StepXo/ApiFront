import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand';
import { BrandResponse } from '../../models/brandResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  bearer: string = `${environment.token}`

  private readonly apiUrl = `${environment.apiStock}/brand`;  

  constructor(private readonly http: HttpClient) { }

  createBrand(brandData: { name: string; description: string }): Observable<Brand> {
    console.log(brandData);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.bearer
    });
    return this.http.post<Brand>(this.apiUrl, brandData, { headers });
  }

  getBrands(page: number, size: number, order: string = 'asc'): Observable<BrandResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+ this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<BrandResponse>(this.apiUrl, { headers, params });
  }
}
