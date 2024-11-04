import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn().mockReturnValue('token'),
      logout: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isLoggedIn based on authService token', () => {
    expect(component.isLoggedIn).toBe(true);
    expect(authServiceMock.getToken).toHaveBeenCalled();
  });

  it('should call authService.logout and navigate to /auth-required on logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(component.isLoggedIn).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth-required']);
  });

  it('should have correct menu items', () => {
    expect(component.menuItems.length).toBe(4);
    expect(component.menuItems).toEqual([
      { name: OrganismConstants.HOME, link: OrganismConstants.HOME_PATH },
      { name: OrganismConstants.CATEGORY, link: OrganismConstants.CATEGORY_PATH },
      { name: OrganismConstants.BRAND, link: OrganismConstants.BRAND_PATH },
      { name: OrganismConstants.ITEM, link: OrganismConstants.ITEM_PATH },
    ]);
  });

  it('should render logo and menu burger in the template', () => {
    const headerElement: HTMLElement = fixture.nativeElement;
    const logo = headerElement.querySelector('app-logo');
    const menuBurger = headerElement.querySelector('app-menu-burger');

    expect(logo).toBeTruthy();
    expect(menuBurger).toBeTruthy();
  });
});
