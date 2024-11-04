import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SupplyRequest } from '../../models/supplyRequest';
import { SupplyResponse } from '../../models/supplyResponse';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = `${environment.apiTransaction}`;

  constructor(private readonly http: HttpClient) {}

  createSupply(supplyData: SupplyRequest): Observable<SupplyResponse> {
    return this.http.post<SupplyResponse>(`${this.apiUrl}/supply`, supplyData);
  }

  checkDate(id: number): Observable<string> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<string>(`${this.apiUrl}/date`, { params });
  }

  checkDates(ids: number[]): Observable<string> {
    const params = new HttpParams().set('id', ids.join(','));
    return this.http.get<string>(`${this.apiUrl}/dates`, { params });
  }
}
