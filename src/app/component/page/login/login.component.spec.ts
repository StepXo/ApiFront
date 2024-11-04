import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let authPipeMock: jest.Mocked<AuthPipe>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    authPipeMock = {
      transform: jest.fn()
    } as unknown as jest.Mocked<AuthPipe>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthPipe, useValue: authPipeMock },
        { provide: Router, useValue: routerMock },
        { provide: ValidationsService, useClass: ValidationsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formFieldsConfig with email and password fields', () => {
    expect(component.formFieldsConfig.length).toBe(2);
    expect(component.formFieldsConfig[0]).toEqual({
      name: 'email',
      label: 'Correo Electrónico',
      type: 'text',
      size: EnumSize.Medium,
      validations: {
        type: 'string',
        email: true,
        required: true,
      }
    });
    expect(component.formFieldsConfig[1]).toEqual({
      name: 'password',
      label: 'Contraseña',
      type: 'password',
      size: EnumSize.Medium,
      validations: {
        type: 'string',
        required: true,
      }
    });
  });

  it('should show an error message if form data is invalid', () => {
    const invalidData = { name: 'Invalid Data' };
    component.onFormSubmit(invalidData as any);
    expect(component.errorMessage).toBe('Datos inválidos. Por favor, verifica el formulario.');
  });

  it('should navigate to /home on successful login', () => {
    const validData = { email: 'test@example.com', password: 'password123' };
    authServiceMock.login.mockReturnValue(of('mockedToken'));
    authPipeMock.transform.mockReturnValue(of('mockedTokenTransformed'));

    component.onFormSubmit(validData);

    expect(authServiceMock.login).toHaveBeenCalledWith(validData);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set errorMessage on login failure', () => {
    const validData = { email: 'test@example.com', password: 'password123' };
    const errorResponse = { message: 'Credenciales incorrectas' };

    authServiceMock.login.mockReturnValue(throwError(() => errorResponse));
    authPipeMock.transform.mockReturnValue(throwError(() => errorResponse));
    jest.spyOn(ValidationsService, 'validateLogin').mockReturnValue('Credenciales incorrectas');

    component.onFormSubmit(validData);

    expect(authServiceMock.login).toHaveBeenCalledWith(validData);
    expect(component.errorMessage).toBe('Credenciales incorrectas');
  });
});
