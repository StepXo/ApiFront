import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { ItemService } from 'src/app/shared/service/item/item.service';
import { of, throwError } from 'rxjs';
import { DisplayItem } from 'src/app/shared/models/displayItem';
import { ItemRequest } from 'src/app/shared/models/ItemRequest';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let itemService: jest.Mocked<ItemService>;

  const mockItemsResponse = {
    content: [
      {
        id: 1,
        name: 'Item1',
        description: 'Desc1',
        quantity: 10,
        price: 100,
        category: [{ id: 1, name: 'Cat1', description: 'Category 1' }],
        brand: { id: 1, name: 'Brand1', description: 'Brand 1' }
      },
      {
        id: 2,
        name: 'Item2',
        description: 'Desc2',
        quantity: 20,
        price: 200,
        category: [{ id: 2, name: 'Cat2', description: 'Category 2' }],
        brand: { id: 2, name: 'Brand2', description: 'Brand 2' }
      }
    ],
    totalPages: 1
  };

  const transformedMockItems: DisplayItem[] = [
    {
      id: 1,
      name: 'Item1',
      description: 'Desc1',
      quantity: 10,
      price: 100,
      category: ['Cat1'],
      brand: 'Brand1'
    },
    {
      id: 2,
      name: 'Item2',
      description: 'Desc2',
      quantity: 20,
      price: 200,
      category: ['Cat2'],
      brand: 'Brand2'
    }
  ];

  beforeEach(async () => {
    const itemServiceMock = {
      getItem: jest.fn().mockReturnValue(of(mockItemsResponse)),
      getItemByField: jest.fn().mockReturnValue(of(mockItemsResponse)),
      createItem: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      providers: [{ provide: ItemService, useValue: itemServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    itemService = TestBed.inject(ItemService) as jest.Mocked<ItemService>;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar datos usando getItem cuando orderField es name', () => {
    component.currentSortField = 'name';
    component.loadData(1, 10, 'asc');
    expect(itemService.getItem).toHaveBeenCalledWith(0, 10, 'asc');
    expect(component.items).toEqual(transformedMockItems);
  });
  
  it('debe cargar datos usando getItemByField cuando orderField no es name', () => {
    component.currentSortField = 'category';
    component.loadData(1, 10, 'asc', 'category');
    expect(itemService.getItemByField).toHaveBeenCalledWith(0, 10, 'asc', 'category');
    expect(component.items).toEqual(transformedMockItems);
  });

  it('debe manejar errores al cargar datos', () => {
    jest.spyOn(console, 'error').mockImplementation();
    itemService.getItem.mockReturnValue(throwError(() => new Error('Error loading items')));
    component.loadData(1, 10, 'asc');
    expect(console.error).toHaveBeenCalledWith(PageConstants.ERROR_ITEMS, new Error('Error loading items'));
  });

  it('debe actualizar currentSortField y order al cambiar orden', () => {
    component.onSortChange({ field: 'EXISTENCIAS', order: 'desc' });
    expect(component.currentSortField).toBe('quantity');
    expect(component.pagination.order).toBe('desc');
  });

  it('debe actualizar correctamente el campo de ordenación y el orden cuando se cambie de orden', () => {
    component.onSortChange({ field: 'EXISTENCIAS', order: 'desc' });
    expect(component.currentSortField).toBe('quantity');
    expect(component.pagination.order).toBe('desc');
  });

  it('debe llamar a createItem en el servicio al enviar el formulario', () => {
    const itemRequest: ItemRequest = {
      name: 'NewItem',
      description: 'NewDesc',
      quantity: 5,
      price: 50,
      category: [1],
      brand: 1
    };
    component.onFormSubmit(itemRequest);
    expect(itemService.createItem).toHaveBeenCalledWith(itemRequest);
  });

  it('debe manejar errores al crear un ítem', () => {
    jest.spyOn(console, 'error').mockImplementation();
    itemService.createItem.mockReturnValue(throwError(() => new Error('Create item error')));
    component.onFormSubmit({
      name: 'ErrorItem',
      description: 'ErrorDesc',
      quantity: 0,
      price: 0,
      category: [1],
      brand: 1
    });
    expect(console.error).toHaveBeenCalledWith('Error en createItem:', new Error('Create item error'));
  });

  it('debe reiniciar la paginación al cambiar de página', () => {
    component.onPageChange(2);
    expect(component.pagination.page).toBe(2);
  });

  it('debe mostrar un error si onFormSubmit recibe datos inválidos', () => {
    jest.spyOn(console, 'error').mockImplementation();
    const invalidData = { name: 'Invalid Data' }; 
    component.onFormSubmit(invalidData as any); 

    expect(console.error).toHaveBeenCalledWith("Datos no válidos recibidos en onSubmit:", invalidData);
  });

  it('debe manejar el cambio de orden correctamente al cambiar entre ascendente y descendente', () => {
    component.onSortChange({ field: 'NOMBRE', order: 'asc' });
    expect(component.pagination.order).toBe('asc');
    expect(component.currentSortField).toBe('name');

    component.onSortChange({ field: 'NOMBRE', order: 'desc' });
    expect(component.pagination.order).toBe('desc');
  });

  it('debe reiniciar la página a la primera cuando cambia el orden', () => {
    component.pagination.page = 3; 
    component.onSortChange({ field: 'EXISTENCIAS', order: 'asc' });
    expect(component.pagination.page).toBe(1); 
  });
});
