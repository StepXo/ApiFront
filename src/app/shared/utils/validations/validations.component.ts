import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { errorMessages } from '../../constant/errors';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent {
  static validateInput(control: FormControl): string | null {
    if (!control || !control.errors) return null;

    for (const errorName of Object.keys(control.errors)) {
      const errorMessage = errorMessages[errorName];
      
      if (typeof errorMessage === 'function') {
        return errorMessage(control.errors[errorName]);
      }
      if (errorMessage) {
        return errorMessage;
      }
    }
    return null;
  }

  static validateCategory(error: any): string | null {
    if (error.status === 403) {
      return 'No estás autorizado o el token ha vencido.';
    }

    if (error.status === 409) {
      return 'Ya existe una categoría con ese nombre.';
    } 
    return 'Error desconocido, por favor intentalo de nuevo.';
  }
  
}

