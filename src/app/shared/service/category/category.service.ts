import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryDto } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  bearer: string = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6IjEiLCJpYXQiOjE3Mjk0OTE4MzcsImV4cCI6MTcyOTQ5MzI3N30.tbcbfr1TVIcoYYlgkkxWJJrmBDmHdlztzrMuZC1n35M'

  private apiUrl = 'http://localhost:9091/category';  

  constructor(private http: HttpClient) { }

  createCategory(categoryData: { name: string; description: string }): Observable<CategoryDto> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.bearer
    });
    return this.http.post<CategoryDto>(this.apiUrl, categoryData, { headers });
  }

  getCategories(page: number, size: number): Observable<CategoryResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+ this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<CategoryResponse>(this.apiUrl, { headers, params });
  }
}
