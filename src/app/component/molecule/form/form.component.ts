import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() formName: string = 'Formulario'; 
  @Input() inputItems: number = 1;
  @Input() inputTypes: string[] = [];
  @Input() placeholders: string[] = [];
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() buttonLabel: string = '';

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  get buttonSize(): 'small' | 'medium' | 'large' {
    return this.size === 'normal' ? 'medium' : this.size;
  }

  formValues: string[] = [];

  handleInputChange(value: string, index: number): void {
    this.formValues[index] = value;
  }

  submitForm(): void {
    const formData = {
      formName: this.formName,
      values: this.formValues
    };
    this.formSubmit.emit(formData);
  }
}
