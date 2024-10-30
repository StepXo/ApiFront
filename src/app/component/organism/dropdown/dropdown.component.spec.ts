import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent } from './dropdown.component';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { FormControl } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';
import { FormField } from 'src/app/shared/models/formField';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { SimpleChange } from '@angular/core';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;
  let categoryService: jest.Mocked<CategoryService>;

  const mockBrands: Brand[] = [
    { id: 1, name: 'Brand1', description: 'Description1' },
    { id: 2, name: 'Brand2', description: 'Description2' }
  ];

  const mockCategories: Category[] = [
    { id: 1, name: 'Category1', description: 'Description1' },
    { id: 2, name: 'Category2', description: 'Description2' }
  ];

  const mockFormField: FormField = {
    control: new FormControl([]),
    label: 'Categoria',
    type: 'dropdown',
    size: EnumSize.Small,
    message: '',
    length: 3
  };

  beforeEach(async () => {
    const categoryServiceMock = {
      getCategoryList: jest.fn().mockReturnValue(of(mockCategories))
    };
    const brandServiceMock = {
      getBrandList: jest.fn().mockReturnValue(of(mockBrands))
    };

    await TestBed.configureTestingModule({
      declarations: [DropdownComponent],
      providers: [
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: BrandService, useValue: brandServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.formField = mockFormField;
    categoryService = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar categorías cuando el label es "Categoria"', () => {
    component.loadData('Categoria');
    expect(categoryService.getCategoryList).toHaveBeenCalled();
    expect(component.data).toEqual(mockCategories);
  });

  it('debe manejar errores al cargar categorías', () => {
    jest.spyOn(console, 'error').mockImplementation();
    categoryService.getCategoryList.mockReturnValue(throwError(() => new Error('Error loading categories')));
    component.loadData('Categoria');
    expect(console.error).toHaveBeenCalledWith('Error loading categories:', new Error('Error loading categories'));
  });

  it('debe seleccionar y deseleccionar un ítem', () => {
    component.selectItem(mockCategories[0]);
    expect(component.selectedItems).toContain(mockCategories[0]);

    component.selectItem(mockCategories[0]);
    expect(component.selectedItems).not.toContain(mockCategories[0]);
  });

  it('debe abrir y cerrar el dropdown', () => {
    component.toggleDropdown();
    expect(component.isOpen).toBeTruthy();

    component.toggleDropdown();
    expect(component.isOpen).toBeFalsy();
  });

  it('debe establecer el estado del dropdown con setDropdownState', () => {
    component.setDropdownState(true);
    expect(component.isOpen).toBeTruthy();

    component.setDropdownState(false);
    expect(component.isOpen).toBeFalsy();
  });

  it('debe deshabilitar el input cuando el límite de selección es alcanzado', () => {
    component.selectedItems = [mockCategories[0], mockCategories[1]];
    expect(component.isInputDisabled()).toBe(false);

    component.selectedItems.push(mockBrands[0]);
    expect(component.isInputDisabled()).toBe(true);
  });

  it('debe ejecutar clearAllSelections cuando resetSelection cambia a true', () => {
    jest.spyOn(component, 'clearAllSelections');
    component.ngOnChanges({
      resetSelection: new SimpleChange(false, true, false)
    });
    expect(component.clearAllSelections).toHaveBeenCalled();
  });

  it('debe actualizar el mensaje de error en updateErrorMessage', () => {
    jest.spyOn(component.formField.control, 'markAsDirty');
    component.formField.control.setErrors({ required: true });
    component.updateErrorMessage(component.formField.control);
    expect(component.formField.message).toBe('Este campo es requerido.');
  });

  it('debe filtrar los ítems correctamente', (done) => {
    component.data = mockBrands;
    component.onInputChange({ target: { value: 'Brand1' } } as any);
    
    setTimeout(() => {
      expect(component.filteredItems).toEqual([mockBrands[0]]);
      done();
    }, 300);
  });

  it('debe cerrar el dropdown al hacer clic fuera', () => {
    component.isOpen = true;
    const event = new MouseEvent('click');
    jest.spyOn(component.dropdownContainer.nativeElement, 'contains').mockReturnValue(false);
    component.onDocumentClick(event);
    expect(component.isOpen).toBeFalsy();
  });

  it('debe actualizar selectedItems y control al deseleccionar un ítem', () => {
    component.selectedItems = [mockBrands[0]];
    component.removeItem(mockBrands[0]);
    expect(component.selectedItems).not.toContain(mockBrands[0]);
    expect(component.formField.control.value).toEqual([]);
  });
});
