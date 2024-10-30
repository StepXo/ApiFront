import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA], 
    });
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });

  it('should have a header with logo and menu items', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const logo = headerElement.querySelector('app-logo');
    const menuBurger = headerElement.querySelector('app-menu-burger');

    expect(logo).toBeTruthy(); 
    expect(menuBurger).toBeTruthy(); 
  });

  it('should have correct menu items', () => {
    expect(component.menuItems.length).toBe(4);
    expect(component.menuItems).toEqual([
      { name: 'Inicio', link: '/home' },
      { name: 'Categorias', link: '/category' },
      { name: 'Marcas', link: '/brand' },
      { name: 'Articulos', link: '/item' },
    ]); 
  });
});
