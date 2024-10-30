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

  bearer: string = `${environment.token}`

  private readonly apiUrl = `${environment.apiStock}/item`;  

  constructor(private readonly http: HttpClient) { }

  createItem(itemData: ItemRequest): Observable<Item> {
    console.log(itemData)
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.bearer
    });
    return this.http.post<Item>(this.apiUrl, itemData, { headers });
  }

  getItem(page: number, size: number, order: string = 'asc'): Observable<ItemResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer `+ this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<ItemResponse>(this.apiUrl, { headers, params });
  }

  getItemByField(page: number, size: number, order: string, field: string): Observable<ItemResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.bearer
    });
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('order', order);
    return this.http.get<ItemResponse>(`${this.apiUrl}/${field}`, { headers, params });
  }
  

}
