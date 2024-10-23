import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome message', () => {
    const headingElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(headingElement.textContent).toContain('Bienvenido');
  });

  it('should render buttons based on the buttons array', () => {
    const buttons = fixture.debugElement.queryAll(By.css('app-button'));
    expect(buttons.length).toBe(component.buttons.length);
  });

  it('should pass the correct inputs to app-button components', () => {
    const buttonElements = fixture.debugElement.queryAll(By.css('app-button'));
    
    expect(buttonElements.length).toBe(component.buttons.length);
    
    const firstButton = buttonElements[0].nativeNode;
    const secondButton = buttonElements[1].nativeNode;
    const thirdButton = buttonElements[2].nativeNode;
    
    expect(firstButton.label).toBe('Categorias');
    expect(firstButton.size).toBe(EnumSize.Large);
    expect(firstButton.route).toBe('/category');
    expect(firstButton.isDisabled).toBe(false);
    
    expect(secondButton.label).toBe('Marcas');
    expect(secondButton.size).toBe(EnumSize.Large);
    expect(secondButton.route).toBe('/brand');
    expect(secondButton.isDisabled).toBe(false);
    
    expect(thirdButton.label).toBe('Articulos');
    expect(thirdButton.size).toBe(EnumSize.Large);
    expect(thirdButton.route).toBe('/item');
    expect(thirdButton.isDisabled).toBe(true);
  });
});
