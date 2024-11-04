import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleComponent } from './role.component';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { RoleDataService } from 'src/app/shared/service/role/role-data.service';
import { of, throwError } from 'rxjs';
import { RoleEnum } from 'src/app/shared/models/roleEnum';

describe('RoleComponent', () => {
  let component: RoleComponent;
  let fixture: ComponentFixture<RoleComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let authPipeMock: jest.Mocked<AuthPipe>;
  let roleDataServiceMock: jest.Mocked<RoleDataService>;

  beforeEach(async () => {
    authServiceMock = {
      getRole: jest.fn().mockReturnValue('ROLE_ADMIN'),
      setRole: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    authPipeMock = {
      transform: jest.fn()
    } as unknown as jest.Mocked<AuthPipe>;

    roleDataServiceMock = {} as jest.Mocked<RoleDataService>;

    await TestBed.configureTestingModule({
      declarations: [RoleComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: AuthPipe, useValue: authPipeMock },
        { provide: RoleDataService, useValue: roleDataServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formFieldsConfig with necessary fields', () => {
    expect(component.formFieldsConfig.length).toBe(2);
    const idField = component.formFieldsConfig.find(field => field.name === 'id');
    const roleField = component.formFieldsConfig.find(field => field.name === 'role');
    expect(idField).toBeTruthy();
    expect(roleField).toBeTruthy();
  });

  it('should show an error message if form data is invalid', () => {
    const invalidData = { name: 'Invalid Data' };
    component.onFormSubmit(invalidData as any);
    expect(component.errorMessage).toBe('Datos inválidos. Por favor, verifica el formulario.');
  });

  it('should call setRole with correct data for valid form input', () => {
    const validData = { id: 123, role: [2] };
    const roleName = 'ADMIN';
  
    authPipeMock.transform.mockReturnValue(of('mockedToken'));
    authServiceMock.setRole.mockReturnValue(of('mockedToken'));
  
    component.onFormSubmit(validData);
  
    expect(authServiceMock.setRole).toHaveBeenCalledWith({ id: validData.id, role: roleName });
    expect(component.errorMessage).toBeNull();
  });
  

  it('should set errorMessage on role modification failure', () => {
    const validData = { id: 123, role: [2] };
    const errorResponse = { message: 'Error desconocido, por favor inténtalo de nuevo.' };

    authServiceMock.setRole.mockReturnValue(throwError(() => errorResponse));
    authPipeMock.transform.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit(validData);

    expect(authServiceMock.setRole).toHaveBeenCalledWith({ id: validData.id, role: 'ADMIN' });
    expect(component.errorMessage).toBe('Error desconocido, por favor inténtalo de nuevo.');
  });

  it('should correctly map role IDs to role names', () => {
    const roleMapping = {
      1: RoleEnum.USER,
      2: RoleEnum.ADMIN,
      3: RoleEnum.WAREHOUSE_AUX
    };

    expect(roleMapping[1]).toBe(RoleEnum.USER);
    expect(roleMapping[2]).toBe(RoleEnum.ADMIN);
    expect(roleMapping[3]).toBe(RoleEnum.WAREHOUSE_AUX);
  });
});
