import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formName = 'Inicio de Sesión';
  button = {
    label: 'Iniciar Sesión',
    size: EnumSize.Medium
  };
  errorMessage: string | null = null;
  formFieldsConfig: FormFieldConfig[];
  size: EnumSize = EnumSize.Small;

  constructor(
    private readonly authService: AuthService,
    private readonly authPipe: AuthPipe,
    private readonly router: Router,

  ) {
    this.formFieldsConfig = [
      {
        name: 'email',
        label: 'Correo Electrónico',
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          email: true,
          required: true,
        }
      },
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
        }
      }
    ];
  }

  onFormSubmit(formData: unknown) {
    if (!this.isLogin(formData)) {
      this.errorMessage = 'Datos inválidos. Por favor, verifica el formulario.';
      return;
    }
  
    this.authPipe.transform(this.authService.login(formData)).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = ValidationsService.validateLogin(error);
      }
    });
  }

  private isLogin(data: unknown): data is { email: string; password: string } {
    return (
      typeof data === 'object' &&
      data !== null &&
      'email' in data &&
      'password' in data
    );
  }
}
