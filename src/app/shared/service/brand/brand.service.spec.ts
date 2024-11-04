import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrandService } from './brand.service';
import { Brand } from '../../models/brand';
import { BrandResponse } from '../../models/brandResponse';
import { DropdownItem } from '../../models/dropdownItem';
import { environment } from 'src/environments/environment';

describe('BrandService', () => {
  let service: BrandService;
  let httpMock: HttpTestingController;

  const mockBrand: Brand = { id: 1, name: 'Brand1', description: 'Description1' };
  const mockBrandResponse: BrandResponse = {
    content: [mockBrand],
    totalPages: 1,
    totalElements: 1,
    first: true,
    last: true,
    size: 5
  };

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

  it('should create a new brand', () => {
    const brandData = { name: 'New Brand', description: 'New Description' };
    service.createBrand(brandData).subscribe((brand) => {
      expect(brand).toEqual(mockBrand);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/brand`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(brandData);
    req.flush(mockBrand);
  });

  it('should get brands with pagination', () => {
    const page = 0;
    const size = 5;
    const order = 'asc';

    service.getBrands(page, size, order).subscribe((response) => {
      expect(response).toEqual(mockBrandResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/brand?page=${page}&size=${size}&order=${order}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBrandResponse);
  });

  it('should get brands with default order "asc" if no order is provided', () => {
    const page = 0;
    const size = 5;
    service.getBrands(page, size).subscribe((response) => {
      expect(response).toEqual(mockBrandResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/brand?page=${page}&size=${size}&order=asc`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockBrandResponse);
  });

  it('should retrieve the brand list and update brandSubject', () => {
    const mockBrands: Brand[] = [mockBrand];

    service.getBrandList().subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/brand/list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBrands);

    service.brands$.subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
    });
  });

  it('should return empty dropdown data if getBrandList returns an empty list', () => {
    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/brand/list`);
    req.flush([]);
  });

  it('should transform brands to dropdown items', () => {
    const mockBrands: Brand[] = [mockBrand];
    const expectedDropdownItems: DropdownItem[] = [{ id: 1, name: 'Brand1' }];

    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual(expectedDropdownItems);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/brand/list`);
    req.flush(mockBrands);
  });

  it('should map brands to dropdown items correctly with multiple brands', () => {
    const mockBrands: Brand[] = [
      { id: 1, name: 'Brand1', description: 'Description1' },
      { id: 2, name: 'Brand2', description: 'Description2' }
    ];

    const expectedDropdownItems: DropdownItem[] = [
      { id: 1, name: 'Brand1' },
      { id: 2, name: 'Brand2' }
    ];

    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual(expectedDropdownItems);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/brand/list`);
    req.flush(mockBrands);
  });
});
