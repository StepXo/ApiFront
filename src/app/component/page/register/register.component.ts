import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { ButtonConfig } from 'src/app/shared/models/buttonConfig';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { RoleDataService } from 'src/app/shared/service/role/role-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formName = 'Crea una cuenta';
  button = {
    label: 'Registrar',
    size: EnumSize.Medium
  };
  modifyUserLabel = '¿Quieres modificar un usuario?';
  errorMessage: string | null = null;
  today: string = new Date().toISOString().split('T')[0];
  ageDate: string;
  elder: string;
  formFieldsConfig: FormFieldConfig[];
  size: EnumSize = EnumSize.Small;
  isAdmin: boolean;


  backButtonConfig!: ButtonConfig;
  loginButtonConfig!: ButtonConfig;

  constructor(
    private readonly authService: AuthService,
    private readonly authPipe: AuthPipe,
    private readonly router: Router,
    private readonly roleDataService: RoleDataService

  ) {
    this.isAdmin = this.authService.getRole() === 'ROLE_ADMIN';

    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.ageDate = date.toISOString().split('T')[0];

    date.setFullYear(date.getFullYear() - 100);
    this.elder = date.toISOString().split('T')[0];

    this.formFieldsConfig = [
      {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
          min: 2,
          max: 50,
          pattern: PageConstants.PATTERN
        }
      },
      {
        name: 'lastName',
        label: 'Apellido',
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
          min: 2,
          max: 50,
          pattern: PageConstants.PATTERN
        }
      },
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
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
          min: 8,
        }
      },
      {
        name: 'idDocument',
        label: 'Documento de Identidad',
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'number',
          required: true,
        }
      },
      {
        name: 'phoneNumber',
        label: 'Número de Teléfono',
        type: 'text',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
          pattern: '^(\\+?[0-9]{12}|[0-9]{10})$'
        }
      },
      {
        name: 'birthDate',
        label: 'Fecha de Nacimiento',
        type: 'date',
        size: EnumSize.Medium,
        validations: {
          type: 'date',
          required: true,
          maxDate: this.today,
          minDate: this.elder,
          ageDate: this.ageDate,
        }
      }
    ];

    if (this.isAdmin) {
      this.formFieldsConfig.push({
        name: 'role',
        label: 'Rol',
        type: 'dropdown',
        size: EnumSize.Medium,
        validations: {
          type: 'string',
          required: true,
          max: 1
        },
        dataService: this.roleDataService
      });
    }
  }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    this.initializeButtonConfigs(userRole);
  }

  private initializeButtonConfigs(role: string | null): void {
    console.log(role)
    this.backButtonConfig = {
      label: 'Volver a inicio',
      size: this.size,
      route: '/home'
    };

  this.loginButtonConfig = {
    label: role === 'ROLE_ADMIN' ? '¿Quieres modificar un usuario?' : '¿Ya tienes una cuenta?',
    size: this.size,
    route: role === 'ROLE_ADMIN' ? '/role' : '/login',
    isDisabled: false
  };
  }

  onFormSubmit(formData: unknown) {
    if (!this.isUser(formData)) {
      this.errorMessage = 'Datos inválidos. Por favor, verifica el formulario.';
      return;
    }
  
    if (this.isAdmin && 'role' in formData) {
      this.registerAdminUser(formData);
    } else {
      this.registerStandardUser(formData);
    }
  }
  
  private registerAdminUser(user: User): void {
    this.authService.registerAdmin(user).subscribe({
      next: () => this.handleNavigation(),
      error: () => {
        this.errorMessage = 'Error en el registro de administrador. Por favor, inténtalo de nuevo.';
      }
    });
  }
  
  private registerStandardUser(formData: User): void {
    this.authPipe.transform(this.authService.register(formData)).subscribe({
      next: () => this.handleNavigation(),
      error: () => {
        this.errorMessage = 'Error en el registro. Por favor, inténtalo de nuevo.';
      }
    });
  }
  
  private handleNavigation(): void {
    this.router.navigate(['/home']).catch(() => {
      this.errorMessage = 'Error al redirigir después del registro.';
    });
  }
  

  private isUser(data: unknown): data is User {
    return (
      typeof data === 'object' &&
      data !== null &&
      'name' in data && 
      'lastName' in data && 
      'email' in data && 
      'password' in data &&
      'idDocument' in data && 
      'phoneNumber' in data && 
      'birthDate' in data
    );
  }
}
