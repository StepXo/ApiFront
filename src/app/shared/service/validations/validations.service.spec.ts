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
});
