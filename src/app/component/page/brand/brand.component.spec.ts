import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandComponent } from './brand.component'; 
import { BrandService } from 'src/app/shared/service/brand/brand.service'; 
import { of, throwError } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand'; 
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

describe('BrandComponent', () => { 
  let component: BrandComponent; 
  let fixture: ComponentFixture<BrandComponent>; 
  let brandService: jest.Mocked<BrandService>; 

  const mockBrands: Brand[] = [ 
    { id: 1, name: 'Brand 1', description: 'Description 1' }, 
    { id: 2, name: 'Brand 2', description: 'Description 2' }, 
  ];

  const mockBrandResponse = { 
    content: mockBrands,
    totalPages: 1,
    totalElements: 2,
    first: true,
    last: true,
    size: 5
  };

  beforeEach(async () => {
    const brandServiceMock = { 
      getBrands: jest.fn(), 
      createBrand: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [BrandComponent], 
      providers: [{ provide: BrandService, useValue: brandServiceMock }] 
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent); 
    component = fixture.componentInstance; 
    brandService = TestBed.inject(BrandService) as jest.Mocked<BrandService>; 
    component.pagination = { page: 1, size: 5, totalPages: 1, order: 'asc' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    brandService.getBrands.mockReturnValue(of(mockBrandResponse)); 

    component.ngOnInit();

    expect(brandService.getBrands).toHaveBeenCalledWith(0, 5, 'asc'); 
    expect(component.brands).toEqual(mockBrands); 
    expect(component.pagination.totalPages).toBe(1);
  });

  it('should handle error when loading data', () => {
    console.error = jest.fn();
    brandService.getBrands.mockReturnValue(throwError('Error fetching brands')); 

    component.loadData(1, 5, 'asc');

    expect(console.error).toHaveBeenCalledWith('Error fetching brands', 'Error fetching brands'); 
  });

  it('should update pagination and load data on page change', () => {
    brandService.getBrands.mockReturnValue(of(mockBrandResponse)); 

    component.onPageChange(2);

    expect(component.pagination.page).toBe(2);
    expect(brandService.getBrands).toHaveBeenCalledWith(1, 5, 'asc'); 
  });

  it('should update order and reload data on sort change', () => {
    brandService.getBrands.mockReturnValue(of(mockBrandResponse)); 

    component.onSortChange('desc');

    expect(component.pagination.order).toBe('desc');
    expect(component.pagination.page).toBe(1);
    expect(brandService.getBrands).toHaveBeenCalledWith(0, 5, 'desc'); 
  });

  it('should call createBrand and reload data on successful submission', () => {
    const formData = { name: 'Test Brand', description: 'Brand description' };
    const createdBrand: Brand = { id: 3, name: 'Test Brand', description: 'Brand description' }; 

    brandService.createBrand.mockReturnValue(of(createdBrand)); 
    brandService.getBrands.mockReturnValue(of(mockBrandResponse));

    component.onFormSubmit(formData);

    expect(brandService.createBrand).toHaveBeenCalledWith(formData);
    expect(brandService.getBrands).toHaveBeenCalledTimes(1); 
    expect(component.brands).toEqual(mockBrands);
});

  it('should handle error when createBrand fails', () => {
    const formData = { name: 'Test Brand', description: 'Brand description' };
    const errorResponse = { message: 'An error occurred' };

    brandService.createBrand.mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(ValidationsService, 'validateCategory').mockReturnValue('Validation error occurred');

    component.onFormSubmit(formData);

    expect(brandService.createBrand).toHaveBeenCalledWith(formData);
    expect(component.errorMessage).toBe('Validation error occurred');
  });
});
