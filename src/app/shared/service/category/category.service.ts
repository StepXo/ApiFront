import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiStock}/category`;
  
  // Aquí se establece el token
  private readonly bearer: string = `Bearer ${environment.token}`;

  constructor(private readonly http: HttpClient) { }

  createCategory(categoryData: { name: string; description: string }): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: this.bearer
    });
    return this.http.post<Category>(this.apiUrl, categoryData, { headers });
  }

  getCategories(page: number, size: number, order: string = 'asc'): Observable<CategoryResponse> {
    const headers = new HttpHeaders({
      Authorization: this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<CategoryResponse>(this.apiUrl, { headers, params });
  }

  private categorySubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categorySubject.asObservable();

  getCategoryList(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: this.bearer
    });
    return this.http.get<Category[]>(this.apiUrl + '/list', { headers }).pipe(
      tap(categories => this.categorySubject.next(categories))
    );
  }
}
