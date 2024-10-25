import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';
import { FormField } from 'src/app/shared/models/formField';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { ValidationConfig } from 'src/app/shared/models/validationConfig';
import { ValidationsComponent } from 'src/app/shared/utils/validations/validations.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  implements OnInit {

  @Input() formFieldsConfig: FormFieldConfig[] = [];
  @Input() formName: string = OrganismConstants.EMPTY;
  @Input() button:{label: string, size:EnumSize} = {label:OrganismConstants.EMPTY,size:EnumSize.Medium};

  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;
  formFields: FormField[] = [];
  dropdownFields: FormField[] = [];

  @Input() errorMessage: string | null = null;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({}); 
  }

  ngOnInit() {

    this.formFieldsConfig.forEach(fieldConfig => {
      
      const validators = this.getValidators(fieldConfig.validations);
      const control = this.fb.control(OrganismConstants.EMPTY, validators); 
      this.form.addControl(fieldConfig.name.toLowerCase(), control);

      this.addFormField(control, fieldConfig);

      control.valueChanges.subscribe(() => {
        this.updateErrorMessage(control);
      });
    });
  }
  private addFormField(control: FormControl, fieldConfig: any): void {
    const fieldData = {
      control: control,
      label: fieldConfig.label,
      type: fieldConfig.type,
      size: fieldConfig.size,
      message: this.getErrorMessage(control),
    };
  
    if (fieldConfig.type === 'dropdown') {
      this.dropdownFields.push(fieldData);
    } else {
      this.formFields.push(fieldData);
    }
  }

  get isDisabled(): boolean {
    return !this.form.valid;
  }

  updateErrorMessage(control: FormControl): void {
    const field = this.formFields.find(f => f.control === control);
    if (field) {
      field.message = this.getErrorMessage(control);
    }
  }

  getErrorMessage(control: FormControl): string | null {
    return ValidationsComponent.validateInput(control);
  }

  private getValidators(validations?: ValidationConfig): ValidatorFn[] {
    const validators = [];
    if (validations) {
      if (validations.required) {
        validators.push(Validators.required);
      }
      if (validations.min) {
        validators.push(Validators.minLength(validations.min));
      }
      if (validations.max) {
        validators.push(Validators.maxLength(validations.max));
      }
      if (validations.pattern) {
        validators.push(Validators.pattern(validations.pattern));
      }
    }
    return validators;
  }

  onSubmit() {
    this.errorMessage = null;
    if (!this.form.valid) return;
    const data = this.form.value;
    console.log(data)
    this.formSubmit.emit(data); 
    this.form.reset();
  }
}