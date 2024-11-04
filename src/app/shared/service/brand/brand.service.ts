import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Brand } from '../../models/brand';
import { BrandResponse } from '../../models/brandResponse';
import { environment } from 'src/environments/environment';
import { DropdownDataService } from '../../models/dropdownDataService';
import { DropdownItem } from '../../models/dropdownItem';

@Injectable({
  providedIn: 'root'
})
export class BrandService implements DropdownDataService {
  private readonly apiUrl = `${environment.apiStock}/brand`;

  constructor(private readonly http: HttpClient) {}

  createBrand(brandData: { name: string; description: string }): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brandData);
  }

  getBrands(page: number, size: number, order: string = 'asc'): Observable<BrandResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<BrandResponse>(this.apiUrl, { params });
  }

  private readonly brandSubject = new BehaviorSubject<Brand[]>([]);
  brands$ = this.brandSubject.asObservable();

  getBrandList(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/list`).pipe(
      tap(brands => this.brandSubject.next(brands))
    );
  }

  getData(): Observable<DropdownItem[]> {
    return this.getBrandList().pipe(
      map(brands => brands.map(brand => ({
        id: brand.id,
        name: brand.name
      })))
    );
  }
}
