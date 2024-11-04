import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { RoleDataService } from 'src/app/shared/service/role/role-data.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/shared/models/user';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let authPipeMock: jest.Mocked<AuthPipe>;
  let roleDataServiceMock: jest.Mocked<RoleDataService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      register: jest.fn(),
      registerAdmin: jest.fn(),
      getRole: jest.fn().mockReturnValue('ROLE_ADMIN')
    } as unknown as jest.Mocked<AuthService>;

    authPipeMock = {
      transform: jest.fn()
    } as unknown as jest.Mocked<AuthPipe>;

    roleDataServiceMock = {} as jest.Mocked<RoleDataService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthPipe, useValue: authPipeMock },
        { provide: RoleDataService, useValue: roleDataServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formFieldsConfig with necessary fields', () => {
    expect(component.formFieldsConfig.length).toBeGreaterThanOrEqual(7);
    const roleField = component.formFieldsConfig.find(field => field.name === 'role');
    if (component.isAdmin) {
      expect(roleField).toBeTruthy(); 
    } else {
      expect(roleField).toBeFalsy();
    }
  });

  it('should show an error message if form data is invalid', () => {
    const invalidData = { name: 'Invalid Data' };
    component.onFormSubmit(invalidData as any);
    expect(component.errorMessage).toBe('Datos inválidos. Por favor, verifica el formulario.');
  });

  it('should call register for a standard user on form submit', () => {
    const validData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      idDocument: 12345678,
      phoneNumber: '1234567890',
      birthDate: '2000-01-01'
    };

    authPipeMock.transform.mockReturnValue(of('mockedToken'));
    authServiceMock.register.mockReturnValue(of('mockedToken'));

    component.onFormSubmit(validData);

    expect(authServiceMock.register).toHaveBeenCalledWith(validData);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call registerAdmin for an admin user with role on form submit', () => {
    const validData: User = {
      name: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'password123',
      idDocument: 98765432,
      phoneNumber: '0987654321',
      birthDate: '1990-01-01',
      role: 2 
    };
  
    authServiceMock.registerAdmin.mockReturnValue(of('mockedAdminToken'));
  
    component.onFormSubmit(validData);
  
    expect(authServiceMock.registerAdmin).toHaveBeenCalledWith({
      ...validData,
      role: 'ADMIN' 
    });
    expect(component.errorMessage).toBeNull();
  });

  it('should display an error message if form data has an invalid role for an admin', () => {
    component.isAdmin = true;
    const invalidRoleData = {
      name: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'password123',
      idDocument: 98765432,
      phoneNumber: '0987654321',
      birthDate: '1990-01-01',
      role: 99 
    };

    component.onFormSubmit(invalidRoleData);
    expect(component.errorMessage).toBe('Rol inválido. Por favor, verifica el formulario.');
  });
  
  it('should set errorMessage on registration failure', () => {
    const validData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      idDocument: 12345678,
      phoneNumber: '1234567890',
      birthDate: '2000-01-01'
    };
    const errorResponse = { message: 'Error desconocido, por favor inténtalo de nuevo.' };

    authServiceMock.register.mockReturnValue(throwError(() => errorResponse));
    authPipeMock.transform.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit(validData);

    expect(authServiceMock.register).toHaveBeenCalledWith(validData);
    expect(component.errorMessage).toBe('Error desconocido, por favor inténtalo de nuevo.');
  });

  it('should handle navigation error after registration', (done) => {
    const validData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      idDocument: 12345678,
      phoneNumber: '1234567890',
      birthDate: '2000-01-01'
    };
  
    authPipeMock.transform.mockReturnValue(of('mockedToken'));
    authServiceMock.register.mockReturnValue(of('mockedToken'));
    routerMock.navigate.mockRejectedValue(new Error('Navigation failed'));
  
    component.onFormSubmit(validData);
  
    setTimeout(() => {
      fixture.detectChanges();
  
      expect(authServiceMock.register).toHaveBeenCalledWith(validData);
      expect(component.errorMessage).toBe('Error al redirigir después del registro.');
      done();
    }, 0);
  });
});
