import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';
import { environment } from 'src/environments/environment';
import { DropdownDataService } from '../../models/dropdownDataService';
import { DropdownItem } from '../../models/dropdownItem';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements DropdownDataService {
  private readonly apiUrl = `${environment.apiStock}/category`;

  constructor(private readonly http: HttpClient) {}

  createCategory(categoryData: { name: string; description: string }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, categoryData);
  }

  getCategories(page: number, size: number, order: string = 'asc'): Observable<CategoryResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<CategoryResponse>(this.apiUrl, { params });
  }

  private readonly categorySubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categorySubject.asObservable();

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/list`).pipe(
      tap(categories => this.categorySubject.next(categories))
    );
  }

  getData(): Observable<DropdownItem[]> {
    return this.getCategoryList().pipe(
      map(categories => categories.map(category => ({
        id: category.id,
        name: category.name
      })))
    );
  }
}
