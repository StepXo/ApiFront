import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';
import { environment } from 'src/environments/environment';
import { Item } from '../../models/Item';
import { ItemRequest } from '../../models/ItemRequest';
import { ItemResponse } from '../../models/ItemResponse';

describe('ItemService', () => {
  let service: ItemService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiStock}/item`;
  const token = `Bearer ${environment.token}`;

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

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe crear un ítem con createItem', () => {
    const mockItem: Item = {
      id: 1,
      name: 'Item1',
      description: 'Description1',
      quantity: 10,
      price: 100,
      category: [{ id: 1, name: 'Category1', description: 'Cat Description' }],
      brand: { id: 1, name: 'Brand1', description: 'Brand Description' }
    };
    const itemRequest: ItemRequest = {
      name: 'Item1',
      description: 'Description1',
      quantity: 10,
      price: 100,
      category: [1],
      brand: 1
    };

    service.createItem(itemRequest).subscribe((item) => {
      expect(item).toEqual(mockItem);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockItem);
  });

  it('debe obtener ítems con getItem', () => {
    const mockItemResponse: ItemResponse = {
      content: [
        {
          id: 1,
          name: 'Item1',
          description: 'Description1',
          quantity: 10,
          price: 100,
          category: [{ id: 1, name: 'Category1', description: 'Cat Description' }],
          brand: { id: 1, name: 'Brand1', description: 'Brand Description' }
        }
      ],
      totalElements: 1,
      totalPages: 1,
      first: true,
      last: true,
      size: 1
    };

    service.getItem(0, 10, 'asc').subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=0&size=10&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockItemResponse);
  });

  it('debe obtener ítems por campo con getItemByField', () => {
    const mockItemResponse: ItemResponse = {
      content: [
        {
          id: 1,
          name: 'Item1',
          description: 'Description1',
          quantity: 10,
          price: 100,
          category: [{ id: 1, name: 'Category1', description: 'Cat Description' }],
          brand: { id: 1, name: 'Brand1', description: 'Brand Description' }
        }
      ],
      totalElements: 1,
      totalPages: 1,
      first: true,
      last: true,
      size: 1
    };

    service.getItemByField(0, 10, 'asc', 'brand').subscribe((response) => {
      expect(response).toEqual(mockItemResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/brand?page=0&size=10&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockItemResponse);
  });

  
  it('should set the correct authorization token', () => {
    expect(service.bearer).toBe(environment.token);
  });

});
