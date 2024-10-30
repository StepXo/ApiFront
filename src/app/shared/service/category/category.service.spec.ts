import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../../models/category';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from '../../models/categoryResponse';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiStock}/category`;
  const token = `Bearer ${environment.token}`;

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

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe crear una categoría con createCategory', () => {
    const mockCategory: Category = { id: 1, name: 'TestCategory', description: 'Category Description' };
    const categoryData = { name: 'TestCategory', description: 'Category Description' };

    service.createCategory(categoryData).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockCategory);
  });

  it('debe obtener una lista de categorías con getCategories', () => {
    const mockCategoryResponse: CategoryResponse = {
      content: [
        { id: 1, name: 'Category1', description: 'Description1' },
        { id: 2, name: 'Category2', description: 'Description2' },
      ],
      totalElements: 2,
      totalPages: 1,
      first: true,
      last: true,
      size: 2
    };

    service.getCategories(0, 2, 'asc').subscribe((response) => {
      expect(response).toEqual(mockCategoryResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}?page=0&size=2&order=asc`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockCategoryResponse);
  });

  it('debe obtener una lista de categorías con getCategoryList', () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Category1', description: 'Description1' },
      { id: 2, name: 'Category2', description: 'Description2' }
    ];

    service.getCategoryList().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${apiUrl}/list`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(token);
    req.flush(mockCategories);
  });

  it('debe actualizar el BehaviorSubject al obtener getCategoryList', () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Category1', description: 'Description1' },
      { id: 2, name: 'Category2', description: 'Description2' }
    ];

    service.getCategoryList().subscribe();
    const req = httpMock.expectOne(`${apiUrl}/list`);
    req.flush(mockCategories);

    service.categories$.subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });
  });

  it('should set the correct authorization token', () => {
    expect(service['bearer']).toBe(`Bearer ${environment.token}`);
  });
});
