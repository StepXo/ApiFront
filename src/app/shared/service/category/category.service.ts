import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:9091/category';  

  constructor(private http: HttpClient) { }

  createCategory(categoryData: { name: string; description: string }): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9BRE1JTiIsInN1YiI6IjEiLCJpYXQiOjE3MjkzMTcxNzksImV4cCI6MTcyOTMxODYxOX0.NaPlLTuIUp7W7m5VEoOrpLQRpA9Hfv0T7DUlxDoBvX4'
    });

    return this.http.post(this.apiUrl, categoryData, { headers });
  }
}
