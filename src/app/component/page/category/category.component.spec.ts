import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { of, throwError } from 'rxjs';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { CategoryDto } from 'src/app/shared/models/category';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: jest.Mocked<CategoryService>;

  const mockCategories: CategoryDto[] = [
    { id: 1, name: 'Category 1', description: 'Description 1' },
    { id: 2, name: 'Category 2', description: 'Description 2' },
  ];

  const mockCategoryResponse = {
    content: mockCategories,
    totalPages: 1,
    totalElements: 2,
    first: true,
    last: true,
    size: 5
  };

  beforeEach(async () => {
    const categoryServiceMock = {
      getCategories: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
    component.pagination = { page: 1, size: 5, totalPages: 1, order: 'asc' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse));

    component.ngOnInit();

    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, 'asc');
    expect(component.categories).toEqual(mockCategories);
    expect(component.pagination.totalPages).toBe(1);
  });

  it('should handle error when loading data', () => {
    console.error = jest.fn();
    categoryService.getCategories.mockReturnValue(throwError('Error fetching categories'));

    component.loadData(1, 5, 'asc');

    expect(console.error).toHaveBeenCalledWith('Error fetching categories', 'Error fetching categories');
  });

  it('should update pagination and load data on page change', () => {
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse));

    component.onPageChange(2);

    expect(component.pagination.page).toBe(2);
    expect(categoryService.getCategories).toHaveBeenCalledWith(1, 5, 'asc');
  });

  it('should update order and reload data on sort change', () => {
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse));

    component.onSortChange('desc');

    expect(component.pagination.order).toBe('desc');
    expect(component.pagination.page).toBe(1);
    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, 'desc');
  });
});
