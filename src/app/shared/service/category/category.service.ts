import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  bearer: string = `${environment.token}`

  private readonly apiUrl = `${environment.apiStock}/category`;  

  constructor(private readonly http: HttpClient) { }

  createCategory(categoryData: { name: string; description: string }): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.bearer
    });
    return this.http.post<Category>(this.apiUrl, categoryData, { headers });
  }

  getCategories(page: number, size: number, order: string = 'asc'): Observable<CategoryResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+ this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<CategoryResponse>(this.apiUrl, { headers, params });
  }
}
