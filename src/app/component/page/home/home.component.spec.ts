import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { By } from '@angular/platform-browser';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: ''
})
class MockAppButtonComponent {
  @Input() label!: string;
  @Input() size!: string;
  @Input() route!: string;
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      getRole: jest.fn().mockReturnValue('ROLE_USER'),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, MockAppButtonComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
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

    component.buttons.forEach((button, index) => {
      const buttonComponentInstance = buttonElements[index].componentInstance;

      expect(buttonComponentInstance.label).toBe(component.buttons[index].label);
      expect(buttonComponentInstance.size).toBe(component.buttons[index].size);
      expect(buttonComponentInstance.route).toBe(component.buttons[index].route);
    });
  });

  it('should add the client button if the user is an admin', () => {
    authServiceMock.getRole.mockReturnValue('ROLE_ADMIN');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAdmin).toBe(true);
    const clientButton = component.buttons.find(
      (button) => button.label === PageConstants.CLIENT_LABEL
    );
    expect(clientButton).toBeDefined();
    expect(clientButton?.route).toBe(PageConstants.CLIENT_ROUTE);
  });

  it('should not add the client button if the user is not an admin', () => {
    authServiceMock.getRole.mockReturnValue('ROLE_USER');
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isAdmin).toBe(false);
    const clientButton = component.buttons.find(
      (button) => button.label === PageConstants.CLIENT_LABEL
    );
    expect(clientButton).toBeUndefined();
  });
});
