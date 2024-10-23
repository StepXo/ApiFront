import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { Brand } from '../../models/brand';
import { BrandResponse } from '../../models/brandResponse';
import { environment } from 'src/environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  const mockApiUrl = `${environment.apiStock}/brand`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BrandService]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a brand', () => {
    const mockBrand: Brand = { id: 1, name: 'Test Brand', description: 'Test Description' };

    service.createBrand({ name: 'Test Brand', description: 'Test Description' }).subscribe(response => {
      expect(response).toEqual(mockBrand);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.bearer}`);
    req.flush(mockBrand); 
  });

  it('should get brands', () => {
    const mockResponse: BrandResponse = {
      content: [{ id: 1, name: 'Brand 1', description: 'Description 1' }],
      totalElements: 1,
      totalPages: 1,
      first: true,
      last: true,
      size: 1
    };

    service.getBrands(0, 1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}?page=0&size=1&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.bearer}`);
    req.flush(mockResponse); 
  });
});
