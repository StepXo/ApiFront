import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { errorMessages } from '../../constant/errors';
import { ErrorStatus } from '../../constant/enumErrorStatus';

@Component({
  selector: 'app-validations',
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent {
  static validateInput(control: FormControl): string | null {
    if (!control?.errors) return null;

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
    if (error.status === ErrorStatus.Forbidden) {
      const message = errorMessages['token'];
      return typeof message === 'function' ? message(error) : message;
    }

    if (error.status === ErrorStatus.Conflict) {
      const message = errorMessages['category'];
      return typeof message === 'function' ? message(error) : message;
    } 
    
    const message = errorMessages['genericError'];
    return typeof message === 'function' ? message(error) : message;
  }
}

