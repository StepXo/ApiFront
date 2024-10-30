import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { Brand } from 'src/app/shared/models/brand';

@Component({
  selector: 'app-pagination-button',
  template: '<button (click)="onClick()">{{ label }}</button>'
})
class MockPaginationButtonComponent {
  @Input() label: string = ''; 
  @Input() isAscending: boolean = true;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, MockPaginationButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar los encabezados de columna correctamente', () => {
    component.labels = [{ text: 'Nombre', isButton: false }, { text: 'Acciones', isButton: true }];
    fixture.detectChanges();

    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(2);
    expect(headers[0].nativeElement.textContent.trim()).toBe('Nombre');
    expect(headers[1].nativeElement.textContent.trim()).toBe('Acciones');
  });

  it('debería mostrar los valores en las celdas de la tabla', () => {
    component.values = [
      [{ id: 1, name: 'Categoría 1', description: 'Descripción de categoría' } as Category],
      [{ id: 2, name: 'Marca 2', description: 'Descripción de marca' } as Brand]
    ];
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
  });

  it('debería emitir el evento sortChange con el campo y orden correctos', () => {
    component.labels = [{ text: 'Nombre', isButton: true }];
    component.isAscending = { 'Nombre': true };
    const sortChangeSpy = jest.spyOn(component.sortChange, 'emit');

    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('app-pagination-button button'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(sortChangeSpy).toHaveBeenCalledWith({ field: 'Nombre', order: 'desc' });
  });

  it('debería alternar el orden de clasificación correctamente', () => {
    component.isAscending = { 'Nombre': true };  

    component.toggleSortOrder('Nombre');
    expect(component.isAscending['Nombre']).toBe(false);

    component.toggleSortOrder('Nombre');
    expect(component.isAscending['Nombre']).toBe(true);
  });


  it('debería restablecer el orden ascendente de otros campos al alternar el orden', () => {
    component.labels = [{ text: 'Nombre', isButton: true }, { text: 'Categoría', isButton: true }];
    component.isAscending = { 'Nombre': false, 'Categoría': false };

    component.toggleSortOrder('Nombre');
    expect(component.isAscending['Nombre']).toBe(true); 
    expect(component.isAscending['Categoría']).toBe(true);
  });

  it('debería inicializar isAscending para un campo cuando se usa toggleSortOrder por primera vez', () => {
    component.labels = [{ text: 'Categoría', isButton: true }];
    expect(component.isAscending['Categoría']).toBeUndefined(); 

    component.toggleSortOrder('Categoría');
    expect(component.isAscending['Categoría']).toBe(true); 
  });

  it('debería emitir el evento sortChange en cada alternancia de orden', () => {
    component.labels = [{ text: 'Precio', isButton: true }];
    const sortChangeSpy = jest.spyOn(component.sortChange, 'emit');

    component.toggleSortOrder('Precio');
    expect(sortChangeSpy).toHaveBeenCalledWith({ field: 'Precio', order: 'asc' });

    component.toggleSortOrder('Precio');
    expect(sortChangeSpy).toHaveBeenCalledWith({ field: 'Precio', order: 'desc' });
  });
});
