import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBurgerComponent } from './menu-burger.component';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-menu',
  template: '<button></button>'
})
class MockMenuComponent {
  @Input() buttonName!: string;
  @Input() link!: string;
}

describe('MenuBurgerComponent', () => {
  let component: MenuBurgerComponent;
  let fixture: ComponentFixture<MenuBurgerComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuBurgerComponent, MockMenuComponent],
      imports: [RouterTestingModule] 
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBurgerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); 
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu visibility on button click', () => {
    const buttonElement = fixture.debugElement.query(By.css('.toggle-menu')).nativeElement;

    expect(component.menuVisible).toBeFalsy();
    expect(fixture.debugElement.query(By.css('nav')).classes['visible']).toBeFalsy();

    buttonElement.click();
    fixture.detectChanges();

    expect(component.menuVisible).toBeTruthy();
    expect(fixture.debugElement.query(By.css('nav')).classes['visible']).toBeTruthy();

    buttonElement.click();
    fixture.detectChanges();

    expect(component.menuVisible).toBeFalsy();
    expect(fixture.debugElement.query(By.css('nav')).classes['visible']).toBeFalsy();
  });

  it('should initialize menuItems with isDisabled set to false by default', () => {
    const items = [
      { name: 'Home', link: '/home' },
      { name: 'About', link: '/about', isDisabled: true },
    ];
    component.menuItems = items;
    component.ngOnInit(); 

    expect(component.menuItems[0].isDisabled).toBeFalsy(); 
    expect(component.menuItems[1].isDisabled).toBeTruthy(); 
  });

  it('should navigate to the correct link when a menu item is clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.menuItems = [
      { name: 'Test', link: '/test' },
      { name: 'Home', link: '/home' }
    ];
    fixture.detectChanges();

    const menuButtons = fixture.debugElement.queryAll(By.css('app-menu'));
    menuButtons[0].componentInstance.link = '/test'; 

    component.navigateToLink('/test'); 
    expect(navigateSpy).toHaveBeenCalledWith(['/test']); 
  });
});
