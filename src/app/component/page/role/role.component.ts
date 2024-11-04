import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { ButtonConfig } from 'src/app/shared/models/buttonConfig';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { RoleEnum } from 'src/app/shared/models/roleEnum';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { AuthPipe } from 'src/app/shared/service/pipe/auth-pipe.pipe';
import { RoleDataService } from 'src/app/shared/service/role/role-data.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {

  formName = 'Modifica un usuario';
  button = {
    label: 'Enviar',
    size: EnumSize.Medium
  };
  modifyUserLabel = '¿Quieres modificar un usuario?';
  errorMessage: string | null = null;
  formFieldsConfig: FormFieldConfig[];
  size: EnumSize = EnumSize.Small;
  isAdmin: boolean;

  backButtonConfig!: ButtonConfig;

  constructor(
    private readonly authService: AuthService,
    private readonly authPipe: AuthPipe,
    private readonly roleDataService: RoleDataService
  ) {
    this.isAdmin = this.authService.getRole() === 'ROLE_ADMIN';

    this.formFieldsConfig = [
      {
        name: 'id',
        label: 'User ID',
        type: 'input',
        size: EnumSize.Medium,
        validations: {
          type: 'number',
          required: true,
        }
      },
      {
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
      }
    ];
  }

  ngOnInit(): void {
    const userRole = this.authService.getRole();
    this.initializeButtonConfigs(userRole);
  }

  private initializeButtonConfigs(role: string | null): void {
    this.backButtonConfig = {
      label: 'Volver',
      size: this.size,
      route: '/register'
    };
  }

  onFormSubmit(formData: unknown): void {
    if (!this.isRoleData(formData)) {
      this.errorMessage = 'Datos inválidos. Por favor, verifica el formulario.';
      return;
    }

    const roleMapping: { [key: number]: RoleEnum } = {
      1: RoleEnum.USER,
      2: RoleEnum.ADMIN,
      3: RoleEnum.WAREHOUSE_AUX
    };

    const roleName = roleMapping[formData.role[0]];

    this.setRole(formData.id, roleName);
  }

  private setRole(id: number, role: string): void {
    const requestData = { id, role };
    console.log(requestData)
    this.authPipe.transform(this.authService.setRole(requestData)).subscribe({
      next: () => {
        this.errorMessage = null;
        alert('Rol de usuario modificado con éxito');
      },
      error: (error) => {
        this.errorMessage = ValidationsService.validateRole(error);
      }
    });
}

  private isRoleData(data: unknown): data is { id: number; role: number[] } {
    return (
      typeof data === 'object' &&
      data !== null &&
      'id' in data &&
      'role' in data &&
      Array.isArray((data as any).role) && 
      (data as any).role.length > 0
    );
  }
}
