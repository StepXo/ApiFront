import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationButtonComponent } from './pagination-button.component';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

describe('PaginationButtonComponent', () => {
  let component: PaginationButtonComponent;
  let fixture: ComponentFixture<PaginationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar el label con la flecha ascendente si isAscending es true y el label es alfabético', () => {
    component.label = 'Nombre';
    component.isAscending = true;
    fixture.detectChanges();
    expect(component.dynamicLabel).toBe('Nombre 🠕');
  });

  it('debe mostrar el label con la flecha descendente si isAscending es false y el label es alfabético', () => {
    component.label = 'Nombre';
    component.isAscending = false;
    fixture.detectChanges();
    expect(component.dynamicLabel).toBe('Nombre 🠗');
  });

  it('debe mostrar el label sin flecha si el label no es alfabético', () => {
    component.label = '5';
    component.isAscending = false;
    fixture.detectChanges();
    expect(component.dynamicLabel).toBe('5');
  });

  it('debe mostrar un label vacío si label es AtomConstants.EMPTY', () => {
    component.label = AtomConstants.EMPTY;
    fixture.detectChanges();
    expect(component.dynamicLabel).toBe('');
  });

  it('debe mostrar el label sin flecha si contiene caracteres especiales', () => {
    component.label = '#Especial';
    component.isAscending = true;
    fixture.detectChanges();
    expect(component.dynamicLabel).toBe('#Especial');
  });

  it('debe aplicar correctamente el estilo activo cuando isActive es true', () => {
    component.isActive = true;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.page-button');
    expect(buttonElement.classList).toContain('active');
  });

  it('debe no tener el estilo activo cuando isActive es false', () => {
    component.isActive = false;
    fixture.detectChanges();
    const buttonElement = fixture.nativeElement.querySelector('.page-button');
    expect(buttonElement.classList).not.toContain('active');
  });
});
