export const errorMessages: { [key: string]: string | ((error: any) => string) } = {
    required: 'Este campo es requerido.',
    minlength: (error) => `Debe tener al menos ${error.requiredLength} caracteres.`,
    maxlength: (error) => `No puede tener más de ${error.requiredLength} caracteres.`,
    email: 'Debe ser un correo electrónico válido.',
    pattern: 'El formato no es válido.'
  }; 