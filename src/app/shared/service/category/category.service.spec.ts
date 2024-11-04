import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../../models/category';
import { CategoryResponse } from '../../models/categoryResponse';
import { DropdownItem } from '../../models/dropdownItem';
import { environment } from 'src/environments/environment';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const mockCategory: Category = { id: 1, name: 'Category1', description: 'Description1' };
  const mockCategoryResponse: CategoryResponse = {
    content: [mockCategory],
    totalPages: 1,
    totalElements: 1,
    first: true,
    last: true,
    size: 5
  };

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

  it('should create a new category', () => {
    const categoryData = { name: 'New Category', description: 'New Description' };
    service.createCategory(categoryData).subscribe((category) => {
      expect(category).toEqual(mockCategory);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/category`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(categoryData);
    req.flush(mockCategory);
  });

  it('should get categories with pagination', () => {
    const page = 0;
    const size = 5;
    const order = 'asc';

    service.getCategories(page, size, order).subscribe((response) => {
      expect(response).toEqual(mockCategoryResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/category?page=${page}&size=${size}&order=${order}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoryResponse);
  });

  it('should get categories with default order "asc" if no order is provided', () => {
    const page = 0;
    const size = 5;
    service.getCategories(page, size).subscribe((response) => {
      expect(response).toEqual(mockCategoryResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiStock}/category?page=${page}&size=${size}&order=asc`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoryResponse);
  });

  it('should retrieve the category list and update categorySubject', () => {
    const mockCategories: Category[] = [mockCategory];

    service.getCategoryList().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/category/list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    service.categories$.subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });
  });

  it('should return empty dropdown data if getCategoryList returns an empty list', () => {
    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/category/list`);
    req.flush([]);
  });

  it('should transform categories to dropdown items', () => {
    const mockCategories: Category[] = [mockCategory];
    const expectedDropdownItems: DropdownItem[] = [{ id: 1, name: 'Category1' }];

    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual(expectedDropdownItems);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/category/list`);
    req.flush(mockCategories);
  });

  it('should map categories to dropdown items correctly with multiple categories', () => {
    const mockCategories: Category[] = [
      { id: 1, name: 'Category1', description: 'Description1' },
      { id: 2, name: 'Category2', description: 'Description2' }
    ];

    const expectedDropdownItems: DropdownItem[] = [
      { id: 1, name: 'Category1' },
      { id: 2, name: 'Category2' }
    ];

    service.getData().subscribe((dropdownItems) => {
      expect(dropdownItems).toEqual(expectedDropdownItems);
    });

    const req = httpMock.expectOne(`${environment.apiStock}/category/list`);
    req.flush(mockCategories);
  });
});
