import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component'; 
import { CategoryService } from 'src/app/shared/service/category/category.service'; 
import { of, throwError } from 'rxjs';
import { Category } from 'src/app/shared/models/category'; 
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

describe('CategoryComponent', () => { 
  let component: CategoryComponent; 
  let fixture: ComponentFixture<CategoryComponent>; 
  let categoryService: jest.Mocked<CategoryService>; 

  const mockCategories: Category[] = [ 
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
      createCategory: jest.fn(),
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
    categoryService.getCategories.mockReturnValue(throwError(() => new Error('Error fetching categories'))); 
  
    component.loadData(1, 5, 'asc');
  
    expect(console.error).toHaveBeenCalledWith('Error fetching categories', new Error('Error fetching categories')); 
  });
  

  it('should update pagination and load data on page change', () => {
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse)); 

    component.onPageChange(2);

    expect(component.pagination.page).toBe(2);
    expect(categoryService.getCategories).toHaveBeenCalledWith(1, 5, 'asc'); 
  });

  it('should update order and reload data on sort change', () => {
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse)); 
  
    component.onSortChange({ field: 'name', order: 'desc' });
  
    expect(component.pagination.order).toBe('desc');
    expect(component.pagination.page).toBe(1);
    expect(categoryService.getCategories).toHaveBeenCalledWith(0, 5, 'desc'); 
  });
  

  it('should call createCategory and reload data on successful submission', () => {
    const formData: Category = { id: 3, name: 'Test Category', description: 'Category description' }; 

    categoryService.createCategory.mockReturnValue(of(formData)); 
    categoryService.getCategories.mockReturnValue(of(mockCategoryResponse));

    component.onFormSubmit(formData);

    expect(categoryService.createCategory).toHaveBeenCalledWith(formData);
    expect(categoryService.getCategories).toHaveBeenCalledTimes(1); 
    expect(component.categories).toEqual(mockCategories);
  });

  it('should handle error when createCategory fails', () => {
    const formData: Category = { id: 3, name: 'Test Category', description: 'Category description' };
    const errorResponse = { message: 'An error occurred' };

    categoryService.createCategory.mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(ValidationsService, 'validateCategory').mockReturnValue('Validation error occurred');

    component.onFormSubmit(formData);

    expect(categoryService.createCategory).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe('Validation error occurred');
  });
});
