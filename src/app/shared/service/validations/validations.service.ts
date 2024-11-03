import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { errorMessages } from '../../constant/errors';
import { ErrorStatus } from '../../constant/enumErrorStatus';
import { ValidationConfig } from '../../models/validationConfig';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {
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

  static isNumber(value: any): boolean {
    return value === null || value === '' || (!isNaN(parseFloat(value)) && isFinite(value));
  }
  
  static isInteger(value: any): boolean {
    return value === null || value === '' || Number.isInteger(Number(value));
  }

  static getValidators(validations?: ValidationConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
  
    if (!validations) return validators;
  
    if (validations.required) {
      validators.push(Validators.required);
    }
  
    if (validations.type === 'string') {
      validators.push(...this.getStringValidators(validations));
    }
    if (validations.type === 'number') {
      validators.push(...this.getNumberValidators(validations));
    }
    if (validations.type === 'list') {
      validators.push(...this.getListValidators(validations));
    }
    if (validations.type === 'date') {
      validators.push(...this.getDateValidators(validations));
    }
    if (validations.pattern) {
      validators.push(Validators.pattern(validations.pattern));
    }
    if (validations.email) {
      validators.push(Validators.email);
    }
  
    return validators;
  }
  
  private static getStringValidators(validations: ValidationConfig): ValidatorFn[] {
    const stringValidators: ValidatorFn[] = [];
    if (validations.min) {
      stringValidators.push(Validators.minLength(validations.min));
    }
    if (validations.max) {
      stringValidators.push(Validators.maxLength(validations.max));
    }
    return stringValidators;
  }
  
  private static getNumberValidators(validations: ValidationConfig): ValidatorFn[] {
    const numberValidators: ValidatorFn[] = [];
    if (validations.min) {
      numberValidators.push(Validators.min(validations.min));
    }
    if (validations.max) {
      numberValidators.push(Validators.max(validations.max));
    }
    if (validations.isInteger) {
      numberValidators.push((control: AbstractControl) => 
        ValidationsService.isInteger(control.value) ? null : { notAInteger: true }
      );
    }
    numberValidators.push((control: AbstractControl) => 
      ValidationsService.isNumber(control.value) ? null : { notANumber: true }
    );
    return numberValidators;
  }
  
  private static getListValidators(validations: ValidationConfig): ValidatorFn[] {
    const listValidators: ValidatorFn[] = [];
    if (validations.max !== undefined) {
      listValidators.push((control: AbstractControl) =>
        Array.isArray(control.value) && control.value.length <= validations.max!? null : { 
          maxLengthExceeded: { requiredLength: validations.max, actualLength: control.value?.length || 0 } 
        }
      );
    }
    return listValidators;
  }

  private static getDateValidators(validations: ValidationConfig): ValidatorFn[] {
    const dateValidators: ValidatorFn[] = [];

    if (validations.minDate) {
      dateValidators.push((control: AbstractControl) => {
        const inputDate = new Date(control.value);
        const minDate = new Date(validations.minDate!);
        return inputDate >= minDate ? null : { minDate: { requiredDate: validations.minDate, actualDate: control.value } };
      });
    }

    if (validations.maxDate) {
      dateValidators.push((control: AbstractControl) => {
        const inputDate = new Date(control.value);
        const maxDate = new Date(validations.maxDate!);
        return inputDate <= maxDate ? null : { maxDate: { requiredDate: validations.maxDate, actualDate: control.value } };
      });
    }

    if (validations.ageDate) {
      dateValidators.push((control: AbstractControl) => {
        const inputDate = new Date(control.value);
        const minAgeDate = new Date(validations.ageDate!);
        return inputDate <= minAgeDate ? null : { ageDate: { requiredDate: validations.ageDate, actualDate: control.value } };
      });
    }

    return dateValidators;
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

  static validateBrand(error: any): string | null {
    if (error.status === ErrorStatus.Forbidden) {
      const message = errorMessages['token'];
      return typeof message === 'function' ? message(error) : message;
    }

    if (error.status === ErrorStatus.Conflict) {
      const message = errorMessages['brand'];
      return typeof message === 'function' ? message(error) : message;
    } 
    
    const message = errorMessages['genericError'];
    return typeof message === 'function' ? message(error) : message;
  }
}
