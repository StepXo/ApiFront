import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../models/user';
import { Login } from '../../models/login';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and store the token', () => {
    const loginData: Login = { email: 'test@example.com', password: 'password123' };
    const mockResponse = { token: 'mockedToken' };

    service.login(loginData).subscribe(token => {
      expect(token).toBe('mockedToken');
      expect(service.getToken()).toBe('mockedToken');
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call register and store the token', () => {
    const userData: User = {
      name: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      idDocument: 12345678,
      phoneNumber: '1234567890',
      birthDate: '2000-01-01'
    };
    const mockResponse = { token: 'mockedToken' };

    service.register(userData).subscribe(token => {
      expect(token).toBe('mockedToken');
      expect(service.getToken()).toBe('mockedToken');
    });

    const req = httpMock.expectOne(`${apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call registerAdmin', () => {
    const userData: User = {
      name: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'password123',
      idDocument: 98765432,
      phoneNumber: '0987654321',
      birthDate: '1990-01-01'
    };

    service.registerAdmin(userData).subscribe(response => {
      expect(response).toBe('Success');
    });

    const req = httpMock.expectOne(`${apiUrl}/admin`);
    expect(req.request.method).toBe('POST');
    req.flush('Success');
  });

  it('should call setRole with the correct data', () => {
    const data = { id: 1, role: 'ADMIN' };

    service.setRole(data).subscribe(response => {
      expect(response).toBe('Role set successfully');
    });

    const req = httpMock.expectOne(`${apiUrl}/admin/role`);
    expect(req.request.method).toBe('POST');
    req.flush('Role set successfully');
  });

  it('should store the token in localStorage', () => {
    const token = 'mockedToken';
    service.setToken(token);
    expect(localStorage.getItem('authToken')).toBe(token);
  });

  it('should retrieve the token from localStorage', () => {
    const token = 'mockedToken';
    localStorage.setItem('authToken', token);
    expect(service.getToken()).toBe(token);
  });

  it('should remove the token on logout', () => {
    localStorage.setItem('authToken', 'mockedToken');
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should decode and return role from the token', () => {
    const mockToken = btoa(JSON.stringify({ role: 'ADMIN' }));
    const fullToken = `header.${mockToken}.signature`;
    localStorage.setItem('authToken', fullToken);

    expect(service.getRole()).toBe('ADMIN');
  });

  it('should return null if token is not present', () => {
    expect(service.getRole()).toBeNull();
  });

  it('should return null if token is invalid', () => {
    localStorage.setItem('authToken', 'invalid.token');
    expect(service.getRole()).toBeNull();
  });
});
