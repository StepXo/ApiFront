import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { Brand } from '../../models/brand';
import { environment } from 'src/environments/environment';
import { BrandResponse } from '../../models/brandResponse';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiStock}/brand`;

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

  it('debe crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe crear una marca con createBrand', () => {
    const mockBrand: Brand = { id: 1, name: 'TestBrand', description: 'Brand Description' };
    const brandData = { name: 'TestBrand', description: 'Brand Description' };

    service.createBrand(brandData).subscribe((brand) => {
      expect(brand).toEqual(mockBrand);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockBrand);
  });

  it('debe obtener una lista de marcas con getBrands', () => {
    const mockBrandResponse: BrandResponse = {
      content: [
        { id: 1, name: 'Brand1', description: 'Description1' },
        { id: 2, name: 'Brand2', description: 'Description2' },
      ],
      totalElements: 2,
      totalPages: 1,
      first: true,
      last: true,
      size: 2
    };

    service.getBrands(0, 2, 'asc').subscribe((response) => {
      expect(response).toEqual(mockBrandResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=0&size=2&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockBrandResponse);
  });

  it('debe obtener una lista de marcas con getBrandList', () => {
    const mockBrands: Brand[] = [
      { id: 1, name: 'Brand1', description: 'Description1' },
      { id: 2, name: 'Brand2', description: 'Description2' }
    ];

    service.getBrandList().subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(`${apiUrl}/list`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockBrands);
  });

  it('debe actualizar el BehaviorSubject al obtener getBrandList', () => {
    const mockBrands: Brand[] = [
      { id: 1, name: 'Brand1', description: 'Description1' },
      { id: 2, name: 'Brand2', description: 'Description2' }
    ];

    service.getBrandList().subscribe();
    const req = httpMock.expectOne(`${apiUrl}/list`);
    req.flush(mockBrands);

    service.brands$.subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });
  });

  it('should set the correct authorization token', () => {
    expect(service['bearer']).toBe(`Bearer ${environment.token}`);
  });
  
});
