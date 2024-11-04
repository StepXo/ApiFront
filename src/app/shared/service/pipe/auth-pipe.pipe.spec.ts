import { AuthPipe } from './auth-pipe.pipe';
import { AuthService } from '../auth/auth.service';
import { of } from 'rxjs';

describe('AuthPipe', () => {
  let authPipe: AuthPipe;
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      setToken: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    authPipe = new AuthPipe(authServiceMock);
  });

  it('debería crear el pipe', () => {
    expect(authPipe).toBeTruthy();
  });

  it('debería llamar a setToken cuando se emite un token válido', (done) => {
    const token = 'validToken';
    const tokenObservable = of(token);

    authPipe.transform(tokenObservable).subscribe(() => {
      expect(authServiceMock.setToken).toHaveBeenCalledWith(token);
      done();
    });
  });

  it('no debería llamar a setToken si se emite un token vacío', (done) => {
    const token = '';
    const tokenObservable = of(token);

    authPipe.transform(tokenObservable).subscribe(() => {
      expect(authServiceMock.setToken).not.toHaveBeenCalled();
      done();
    });
  });
});
