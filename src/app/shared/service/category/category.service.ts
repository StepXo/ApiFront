import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  bearer: string = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6IjEiLCJpYXQiOjE3Mjk3MDI1MTYsImV4cCI6MTcyOTcwMzk1Nn0.d_DaWKdL7wtYNzEjjsm5qQ16TvMLxI53eY8d80ZNK0k'

  private readonly apiUrl = 'http://localhost:9091/category';  

  constructor(private readonly http: HttpClient) { }

  createCategory(categoryData: { name: string; description: string }): Observable<CategoryDto> {
    console.log(categoryData);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.bearer
    });
    return this.http.post<CategoryDto>(this.apiUrl, categoryData, { headers });
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
