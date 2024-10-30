import { FormControl, Validators } from '@angular/forms';
import { errorMessages } from '../../constant/errors';
import { ErrorStatus } from '../../constant/enumErrorStatus';
import { ValidationsService } from './validations.service';

describe('ValidationsService', () => {
  describe('validateInput', () => {
    it('should return null if no errors are present', () => {
      const control = new FormControl('');
      expect(ValidationsService.validateInput(control)).toBeNull();
    });

    it('should return the appropriate error message for required error', () => {
      const control = new FormControl('', { validators: [Validators.required] });
      control.setErrors({ required: true });
      expect(ValidationsService.validateInput(control)).toBe(errorMessages['required']);
    });

    it('should return the appropriate error message for minlength error', () => {
      const control = new FormControl('a', { validators: [Validators.minLength(3)] });
      control.setErrors({ minlength: { requiredLength: 3 } });
      expect(ValidationsService.validateInput(control)).toBe('Debe tener al menos 3 caracteres.');
    });

    it('should return the appropriate error message for maxlength error', () => {
      const control = new FormControl('abcd', { validators: [Validators.maxLength(3)] });
      control.setErrors({ maxlength: { requiredLength: 3 } });
      expect(ValidationsService.validateInput(control)).toBe('No puede tener más de 3 caracteres.');
    });

    it('should return the appropriate error message for email error', () => {
      const control = new FormControl('invalid-email', { validators: [Validators.email] });
      control.setErrors({ email: true });
      expect(ValidationsService.validateInput(control)).toBe(errorMessages['email']);
    });

    it('should return the appropriate error message for pattern error', () => {
      const control = new FormControl('invalid', { validators: [Validators.pattern(/.*/)] });
      control.setErrors({ pattern: true });
      expect(ValidationsService.validateInput(control)).toBe(errorMessages['pattern']);
    });

    it('should return null for unknown error types', () => {
      const control = new FormControl('');
      control.setErrors({ unknownError: true });
      expect(ValidationsService.validateInput(control)).toBeNull();
    });

    it('should return the appropriate message if error message is a function', () => {
      const control = new FormControl('a', { validators: [Validators.minLength(5)] });
      control.setErrors({ minlength: { requiredLength: 5 } });
      errorMessages['minlength'] = () => 'Debe tener al menos 5 caracteres.';
      expect(ValidationsService.validateInput(control)).toBe('Debe tener al menos 5 caracteres.');
    });
  });

  describe('validateCategory', () => {
    it('should return correct message for status ErrorStatus.Forbidden', () => {
      const error = { status: ErrorStatus.Forbidden };
      expect(ValidationsService.validateCategory(error)).toBe('No estás autorizado o el token ha vencido.');
    });

    it('should return correct message for status ErrorStatus.Conflict', () => {
      const error = { status: ErrorStatus.Conflict };
      expect(ValidationsService.validateCategory(error)).toBe('Ya existe una categoría con ese nombre.');
    });

    it('should return default error message for unknown status', () => {
      const error = { status: 500 };
      expect(ValidationsService.validateCategory(error)).toBe('Error desconocido, por favor inténtalo de nuevo.');
    });
  });

  describe('validateBrand', () => {
    it('should return correct message for status ErrorStatus.Forbidden', () => {
      const error = { status: ErrorStatus.Forbidden };
      expect(ValidationsService.validateBrand(error)).toBe('No estás autorizado o el token ha vencido.');
    });

    it('should return correct message for status ErrorStatus.Conflict', () => {
      const error = { status: ErrorStatus.Conflict };
      expect(ValidationsService.validateBrand(error)).toBe('Ya existe una marca con ese nombre.');
    });

    it('should return default error message for unknown status', () => {
      const error = { status: 500 };
      expect(ValidationsService.validateBrand(error)).toBe('Error desconocido, por favor inténtalo de nuevo.');
    });
  });

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      expect(ValidationsService.isNumber(123)).toBe(true);
      expect(ValidationsService.isNumber('123')).toBe(true);
    });

    it('should return true for null or empty string', () => {
      expect(ValidationsService.isNumber(null)).toBe(true);
      expect(ValidationsService.isNumber('')).toBe(true);
    });

    it('should return false for non-numeric strings', () => {
      expect(ValidationsService.isNumber('abc')).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should return true for valid integers', () => {
      expect(ValidationsService.isInteger(123)).toBe(true);
      expect(ValidationsService.isInteger('123')).toBe(true);
    });

    it('should return true for null or empty string', () => {
      expect(ValidationsService.isInteger(null)).toBe(true);
      expect(ValidationsService.isInteger('')).toBe(true);
    });

    it('should return false for non-integer values', () => {
      expect(ValidationsService.isInteger(123.45)).toBe(false);
      expect(ValidationsService.isInteger('123.45')).toBe(false);
    });
  });
  describe('getValidators', () => {
    it('should return required validator if validations.required is true', () => {
      const validators = ValidationsService.getValidators({ type: 'string', required: true });
      const control = new FormControl('');
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['required']).toBeTruthy();
    });
  
    it('should return pattern validator if validations.pattern is set', () => {
      const pattern = '[a-z]+';
      const validators = ValidationsService.getValidators({ type: 'string', pattern });
      const control = new FormControl('123');
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['pattern']).toBeTruthy();
    });
  
    it('should return email validator if validations.email is true', () => {
      const validators = ValidationsService.getValidators({ type: 'string', email: true });
      const control = new FormControl('invalid-email');
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['email']).toBeTruthy();
    });
  
    it('should return minLength validator for type string', () => {
      const validators = ValidationsService.getValidators({ type: 'string', min: 3 });
      const control = new FormControl('ab');
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['minlength']).toBeTruthy();
    });
  
    it('should return max validator for type number', () => {
      const validators = ValidationsService.getValidators({ type: 'number', max: 10 });
      const control = new FormControl(11);
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['max']).toBeTruthy();
    });
  
    it('should include integer validator if isInteger is true', () => {
      const validators = ValidationsService.getValidators({ type: 'number', isInteger: true });
      const control = new FormControl(12.5);
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['notAInteger']).toBeTruthy();
    });
  
    it('should return maxLengthExceeded error for array length greater than max in list validator', () => {
      const validators = ValidationsService.getValidators({ type: 'list', max: 2 });
      const control = new FormControl([1, 2, 3]);
      control.setValidators(validators);
      control.updateValueAndValidity();
      expect(control.errors?.['maxLengthExceeded']).toEqual({
        requiredLength: 2,
        actualLength: 3,
      });
    });
  });
  
});
