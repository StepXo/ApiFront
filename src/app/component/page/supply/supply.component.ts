import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { ButtonConfig } from 'src/app/shared/models/buttonConfig';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { SupplyRequest } from 'src/app/shared/models/supplyRequest';
import { SupplyResponse } from 'src/app/shared/models/supplyResponse';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { ItemService } from 'src/app/shared/service/item/item.service';
import { TransactionService } from 'src/app/shared/service/transaction/transaction.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-supply',
  templateUrl: './supply.component.html',
  styleUrls: ['./supply.component.scss']
})
export class SupplyComponent implements OnInit {
  formName = 'Agrega abastecimiento';
  button = {
    label: 'Enviar',
    size: EnumSize.Medium
  };
  errorMessage: string | null = null;
  formFieldsConfig: FormFieldConfig[];
  size: EnumSize = EnumSize.Small;
  isWarehouseAUX: boolean;

  backButtonConfig!: ButtonConfig;

  constructor(
    private readonly authService: AuthService,
    private readonly itemService: ItemService,
    private readonly transactionService: TransactionService,
    private readonly router: Router,

  ) {
    this.isWarehouseAUX = this.authService.getRole() === 'ROLE_WAREHOUSE_AUX';

    this.formFieldsConfig = [
      {
        name: 'itemId',
        label: 'Item',
        type: 'dropdown',
        size: EnumSize.Medium,
        validations: {
          type: 'list',
          required: true,
          max: 1
        },
        dataService: this.itemService
      },
      {
        name: 'quantity',
        label: 'Cantidad',
        type: 'input',
        size: EnumSize.Medium,
        validations: {
          type: 'number',
          required: true,
        }
      },
      {
        name: 'date',
        label: 'Fecha del Abastecimiento',
        type: 'date',
        size: EnumSize.Medium,
        validations: {
          type: 'date',
        }
      }
    ];
  }

  ngOnInit(): void {
    if (!this.isWarehouseAUX){
      this.handleNavigation();
    }
    this.initializeButtonConfigs();
  }

  private initializeButtonConfigs(): void {
    this.backButtonConfig = {
      label: 'Volver',
      size: this.size,
      route: '/register'
    };
  }

  onFormSubmit(formData: any): void {
    const supplyRequest: SupplyRequest = {
      itemId: Number(formData.itemId),
      quantity: Number(formData.quantity)
    };
    console.log(formData)
    console.log(supplyRequest)

    this.transactionService.createSupply(supplyRequest).subscribe({
      next: (response: SupplyResponse) => {
        console.log('Abastecimiento creado con éxito:', response);
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = ValidationsService.validateSupply(error);
        console.error('Error:', error);
      }
    });
  }

  private async handleNavigation(): Promise<void> {
    try {
      await this.router.navigate(['/home']);
    } catch {
      this.errorMessage = 'Error al redirigir después del registro.';
    }
  }
}
