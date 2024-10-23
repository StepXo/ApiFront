import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  template: '<button (click)="onClick()">{{ label }}</button>',
})
class MockPaginationButtonComponent {
  label!: string;
  isActive!: boolean;

  onClick() {}
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent, MockPaginationButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange when goToPage is called', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.goToPage(2); 
    expect(component.pageChange.emit).toHaveBeenCalledWith(2); 
    expect(component.page).toBe(2); 
  });

  it('should load the next page and emit pageChange', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.page = 1; 
    component.totalPages = 3;

    component.loadNextPage();
    expect(component.page).toBe(2); 
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not load the next page if on the last page', () => {
    component.page = 3; 
    component.totalPages = 3;

    component.loadNextPage();
    expect(component.page).toBe(3);
  });

  it('should load the previous page and emit pageChange', () => {
    jest.spyOn(component.pageChange, 'emit');
    component.page = 2; 
    component.totalPages = 3;

    component.loadPreviousPage();
    expect(component.page).toBe(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should not load the previous page if on the first page', () => {
    component.page = 1; 
    component.totalPages = 3;

    component.loadPreviousPage();
    expect(component.page).toBe(1);
  });

  it('should update visible pages correctly', () => {
    component.page = 1; 
    component.totalPages = 5;

    component.updateVisiblePages();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]); 

    component.page = 5; 
    component.updateVisiblePages(); 
    expect(component.pages).toEqual([1, 2, 3, 4, 5]); 

    component.page = 4; 
    component.updateVisiblePages();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]); 
  });

  it('should handle ngOnChanges correctly', () => {
    component.totalPages = 6;
    component.page = 1;
    component.ngOnChanges();
    expect(component.pages).toEqual([1, 2, 3, 4, "...", 6]); 
  });

  it('should initialize with default values', () => {
    expect(component.page).toBe(1);
    expect(component.totalPages).toBe(1);
    expect(component.pages).toEqual([]);
  });

  it('should update visible pages correctly when totalPages is less than or equal to 5', () => {
    component.totalPages = 5;
    component.updateVisiblePages();
    expect(component.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should update visible pages correctly with ellipsis', () => {
    component.totalPages = 10;
    component.page = 5;
    component.updateVisiblePages();
    expect(component.pages).toEqual([1, '...', 4, 5, 6, '...', 10]);
  });

  it('should go to the specified page and emit pageChange event', () => {
    jest.spyOn(component.pageChange, 'emit');
    
    component.totalPages = 5; 
    component.goToPage(3); 

    expect(component.page).toBe(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
    component.updateVisiblePages();
    expect(component.pages).toContain(3);
  });

  it('should load previous page and emit pageChange event', () => {
    component.page = 3; // Establece la página actual
    jest.spyOn(component.pageChange, 'emit');
    component.loadPreviousPage();
    expect(component.page).toBe(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should load next page and emit pageChange event', () => {
    component.page = 2; // Establece la página actual
    component.totalPages = 5; // Asegúrate de que haya más páginas
    jest.spyOn(component.pageChange, 'emit');
    component.loadNextPage();
    expect(component.page).toBe(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should toggle sort order and emit sortChange event', () => {
    jest.spyOn(component.sortChange, 'emit');
    
    component.toggleSortOrder();
    expect(component.isAscending).toBe(false);
    expect(component.sortChange.emit).toHaveBeenCalledWith('desc');

    component.toggleSortOrder();
    expect(component.isAscending).toBe(true);
    expect(component.sortChange.emit).toHaveBeenCalledWith('asc');
  });
});
