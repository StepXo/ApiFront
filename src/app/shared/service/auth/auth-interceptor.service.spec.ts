import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule,  } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './auth-interceptor.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;
  let httpClient: HttpClient;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header for requests when token exists', () => {
    const token = 'mockedToken';
    authServiceMock.getToken.mockReturnValue(token);

    httpClient.get('/data').subscribe();
    
    const req = httpMock.expectOne('/data');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header for auth requests', () => {
    authServiceMock.getToken.mockReturnValue('mockedToken');

    httpClient.post(`${environment.apiUser}/auth/login`, {}).subscribe();
    const req = httpMock.expectOne(`${environment.apiUser}/auth/login`);
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });

  it('should call logout and navigate to /login on JWT expired error', () => {
    authServiceMock.getToken.mockReturnValue('mockedToken');

    httpClient.get('/data').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/data');
    req.flush({ message: 'JWT expired' }, { status: 403, statusText: 'Forbidden' });

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle other errors without calling logout or navigation', () => {
    authServiceMock.getToken.mockReturnValue('mockedToken');

    httpClient.get('/data').subscribe({
      error: () => {}
    });

    const req = httpMock.expectOne('/data');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(authServiceMock.logout).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
