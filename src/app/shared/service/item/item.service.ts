import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../../models/Item';
import { ItemResponse } from '../../models/ItemResponse';
import { Observable } from 'rxjs';
import { ItemRequest } from '../../models/ItemRequest';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly apiUrl = `${environment.apiStock}/item`;

  constructor(private readonly http: HttpClient) {}

  createItem(itemData: ItemRequest): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, itemData);
  }

  getItem(page: number, size: number, order: string = 'asc'): Observable<ItemResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<ItemResponse>(this.apiUrl, { params });
  }

  getItemByField(page: number, size: number, order: string, field: string): Observable<ItemResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<ItemResponse>(`${this.apiUrl}/${field}`, { params });
  }
}

