import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { environment } from 'src/environments/environment';
import { SupplyRequest } from '../../models/supplyRequest';
import { SupplyResponse } from '../../models/supplyResponse';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiTransaction;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createSupply with correct URL and data', () => {
    const mockSupplyRequest: SupplyRequest = { itemId: 1, quantity: 10 };
    const mockSupplyResponse: SupplyResponse = {id:1, idUser: 1, idItem: 1, quantity: 10, date: "today", };

    service.createSupply(mockSupplyRequest).subscribe(response => {
      expect(response).toEqual(mockSupplyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/supply`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockSupplyRequest);

    req.flush(mockSupplyResponse);
  });

  it('should call checkDate with correct URL and parameters', () => {
    const mockId = 123;
    const mockResponse = '2024-01-01';

    service.checkDate(mockId).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/date?id=${mockId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call checkDates with correct URL and parameters', () => {
    const mockIds = [123, 456, 789];
    const mockResponse = '2024-01-01,2024-01-02,2024-01-03';

    service.checkDates(mockIds).subscribe(response => {
      expect(response).toBe(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/dates?id=${mockIds.join(',')}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});
