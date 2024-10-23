import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { CategoryDto } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockApiUrl = 'http://localhost:9091/category';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a category', () => {
    const mockCategory: CategoryDto = { id: 1, name: 'Test Category', description: 'Test Description' };

    service.createCategory({ name: 'Test Category', description: 'Test Description' }).subscribe(response => {
      expect(response).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.bearer}`);
    req.flush(mockCategory); 
  });

  it('should get categories', () => {
    const mockResponse: CategoryResponse = {
      content: [{ id: 1, name: 'Category 1', description: 'Description 1' }],
      totalElements: 1,
      totalPages: 1,
      first: true,
      last: true,
      size: 1
    };

    service.getCategories(0, 1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}?page=0&size=1&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.bearer}`);
    req.flush(mockResponse); 
  });
});
