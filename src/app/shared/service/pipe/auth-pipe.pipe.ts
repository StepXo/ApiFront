import { Pipe, PipeTransform } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Pipe({
  name: 'authPipe'
})
export class AuthPipe implements PipeTransform {

  constructor(private readonly authService: AuthService) {}

  transform(tokenObservable: Observable<string>): Observable<string> {
    return tokenObservable.pipe(
      tap(token => {
        if (token) {
          this.authService.setToken(token); 
        }
      })
    );
  }
}
