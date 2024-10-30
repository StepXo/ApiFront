import { FullTableComponent } from './full-table.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';

describe('FullTableComponent', () => {
  let component: FullTableComponent;
  let fixture: ComponentFixture<FullTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FullTableComponent);
    component = fixture.componentInstance;

    component.labels = [
      { text: 'Name', isButton: false },
      { text: 'Category', isButton: true },
      { text: 'Brand', isButton: true }
    ];

    component.data = [
      {
        id: 1,
        name: 'Item1',
        description: 'Description1',
        category: [{ id: 1, name: 'Category1', description: 'Desc1' } as Category],
        brand: { id: 1, name: 'Brand1', description: 'Desc1' } as Brand
      },
      {
        id: 2,
        name: 'Item2',
        description: 'Description2',
        category: [{ id: 2, name: 'Category2', description: 'Desc2' } as Category],
        brand: { id: 2, name: 'Brand2', description: 'Desc2' } as Brand
      }
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
        {
          id: 3,
          name: 'Item3',
          description: 'Description3',
          category: [{ id: 3, name: 'Category3', description: 'Desc3' } as Category],
          brand: { id: 3, name: 'Brand3', description: 'Desc3' } as Brand
        }
      ],
      firstChange: false,
      isFirstChange: () => false,
    };

    component.data = simpleChange.currentValue;
    component.ngOnChanges({ data: simpleChange });

    expect(component.values).toEqual([
      [3, 'Item3', 'Description3', [{ id: 3, name: 'Category3', description: 'Desc3' }], { id: 3, name: 'Brand3', description: 'Desc3' }]
    ]);
  });

  it('should load data when onPageChange is called', () => {
    const loadDataFunctionMock = jest.fn();
    component.loadDataFunction = loadDataFunctionMock;

    component.onPageChange();

    expect(loadDataFunctionMock).toHaveBeenCalledWith(component.pagination.page, component.pagination.size);
  });

  it('should update values correctly', () => {
    component.data = [
      {
        id: 4,
        name: 'NewItem',
        description: 'NewDescription',
        category: [{ id: 4, name: 'NewCategory', description: 'NewDesc' } as Category],
        brand: { id: 4, name: 'NewBrand', description: 'NewDesc' } as Brand
      }
    ];

    component.updateTableValues();

    expect(component.values).toEqual([
      [4, 'NewItem', 'NewDescription', [{ id: 4, name: 'NewCategory', description: 'NewDesc' }], { id: 4, name: 'NewBrand', description: 'NewDesc' }]
    ]);
  });

  it('should emit sortChange event', () => {
    jest.spyOn(component.sortChange, 'emit');
    const sortEvent = { field: 'Name', order: 'desc' };

    component.onSortChange(sortEvent);

    expect(component.sortChange.emit).toHaveBeenCalledWith(sortEvent);
  });

  it('should update pagination and load data when onTableSizeChange is called', () => {
    const loadDataFunctionMock = jest.fn();
    component.loadDataFunction = loadDataFunctionMock;

    component.onTableSizeChange(20);

    expect(component.pagination.size).toBe(20);
    expect(component.pagination.page).toBe(1);
    expect(loadDataFunctionMock).toHaveBeenCalledWith(1, 20);
  });

  it('should load data and update values when loadData is called', () => {
    const loadDataFunctionMock = jest.fn();
    component.loadDataFunction = loadDataFunctionMock;

    component.loadData();

    expect(loadDataFunctionMock).toHaveBeenCalledWith(component.pagination.page, component.pagination.size);
    expect(component.values).toEqual(component.data.map(item => Object.values(item)));
  });
});
