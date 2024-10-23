import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockApiUrl = `${environment.apiUser}/login`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user and return a token', () => {
    const mockToken = 'mock-token';
    const userData = { email: 'johndos@example.com', password: '12345' };

    service.actualizeAuth().subscribe(token => {
      expect(token).toEqual(mockToken);
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userData);
    req.flush(mockToken);
  });

  it('should handle error during authentication', () => {

    service.actualizeAuth().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: error => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('POST');
    req.flush('Authentication failed', { status: 500, statusText: 'Server Error' });
  });
});
