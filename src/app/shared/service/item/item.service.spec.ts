import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { environment } from 'src/environments/environment';
import { Item } from '../../models/Item';
import { ItemResponse } from '../../models/ItemResponse';
import { ItemRequest } from '../../models/ItemRequest';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;

  const mockItem: Item = {
    id: 1,
    name: 'Item1',
    description: 'Description1',
    quantity: 10,
    price: 100,
    category: [{ id: 1, name: 'Category1', description: 'Description1' }],
    brand: { id: 1, name: 'Brand1', description: 'Description1' }
  };

  const mockItemResponse: ItemResponse = {
    content: [mockItem],
    totalPages: 1,
    totalElements: 1,
    first: true,
    last: true,
    size: 5
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService]
    });

    service = TestBed.inject(ItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an item', () => {
    const itemRequest: ItemRequest = {
      name: 'NewItem',
      description: 'New Description',
      quantity: 5,
      price: 50,
      category: [1],
      brand: 1
    };

    service.createItem(itemRequest).subscribe((item) => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/item`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(itemRequest);
    req.flush(mockItem);
  });

  it('should get items with pagination', () => {
    const page = 0;
    const size = 5;
    const order = 'asc';

    service.getItem(page, size, order).subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/item?page=${page}&size=${size}&order=${order}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockItemResponse);
  });

  it('should get items with default order if no order specified', () => {
    const page = 0;
    const size = 5;

    service.getItem(page, size).subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/item?page=${page}&size=${size}&order=asc`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockItemResponse);
  });

  it('should get items ordered by a specific field', () => {
    const page = 0;
    const size = 5;
    const order = 'desc';
    const field = 'quantity';

    service.getItemByField(page, size, order, field).subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/item/${field}?page=${page}&size=${size}&order=${order}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockItemResponse);
  });

  it('should get items ordered by a different field', () => {
    const page = 0;
    const size = 5;
    const order = 'asc';
    const field = 'name';

    service.getItemByField(page, size, order, field).subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/item/${field}?page=${page}&size=${size}&order=${order}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockItemResponse);
  });

});
