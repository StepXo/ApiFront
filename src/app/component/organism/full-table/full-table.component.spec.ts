import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullTableComponent } from './full-table.component';
import { SimpleChange } from '@angular/core';

describe('FullTableComponent', () => {
  let component: FullTableComponent;
  let fixture: ComponentFixture<FullTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FullTableComponent);
    component = fixture.componentInstance;
    component.labels = ['Name', 'Age', 'Occupation'];
    component.data = [
      { name: 'John Doe', age: 30, occupation: 'Developer' },
      { name: 'Jane Doe', age: 25, occupation: 'Designer' },
    ];
    component.pagination = { page: 1, size: 10, totalPages: 1, order: 'asc' };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize values when data changes', () => {
    const simpleChange: SimpleChange = {
      previousValue: component.data,
      currentValue: [
        { name: 'Alice', age: 28, occupation: 'Engineer' },
      ],
      firstChange: false,
      isFirstChange: () => false,
    };
  
    component.data = simpleChange.currentValue;
    component.ngOnChanges({ data: simpleChange });
  
    expect(component.values).toEqual([['Alice', 28, 'Engineer']]);
  });
  it('should load data when onPageChange is called', () => {
    const loadDataFunctionMock = jest.fn();
    component.loadDataFunction = loadDataFunctionMock;

    component.onPageChange();

    expect(loadDataFunctionMock).toHaveBeenCalledWith(component.pagination.page, component.pagination.size);
  });

  it('should update values correctly', () => {
    component.data = [
      { name: 'Bob', age: 22, occupation: 'Artist' },
      { name: 'Charlie', age: 35, occupation: 'Teacher' },
    ];

    component.updateTableValues();

    expect(component.values).toEqual([
      ['Bob', 22, 'Artist'],
      ['Charlie', 35, 'Teacher'],
    ]);
  });

  it('should emit sortChange event', () => {
    jest.spyOn(component.sortChange, 'emit');
    const newOrder = 'desc';

    component.onSortChange(newOrder);

    expect(component.sortChange.emit).toHaveBeenCalledWith(newOrder);
  });
});
