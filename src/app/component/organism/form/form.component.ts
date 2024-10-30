import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';
import { FormField } from 'src/app/shared/models/formField';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { ItemRequest } from 'src/app/shared/models/ItemRequest';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() formFieldsConfig: FormFieldConfig[] = [];
  @Input() formName: string = OrganismConstants.EMPTY;
  @Input() button: { label: string, size: EnumSize } = { label: OrganismConstants.EMPTY, size: EnumSize.Medium };

  @Output() formSubmit = new EventEmitter<Category | Brand | ItemRequest>();

  resetDropdownSelection: boolean = false; 
  form: FormGroup;
  formFields: FormField[] = [];
  dropdownFields: FormField[] = [];

  @Input() errorMessage: string | null = null;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.initializeForm();
    this.form.updateValueAndValidity();
  }

  private initializeForm() {
    this.formFields = [];
    this.dropdownFields = [];

    this.formFieldsConfig.forEach(fieldConfig => {
      const control = this.getControl(fieldConfig);
      this.form.addControl(fieldConfig.name.toLowerCase(), control);

      this.addFormField(control, fieldConfig);

      control.valueChanges.subscribe(() => {
        this.updateErrorMessage(control);
      });
    });
  }

  private getControl(fieldConfig: FormFieldConfig): FormControl {
    const validators = ValidationsService.getValidators(fieldConfig.validations);
    return this.createControl(fieldConfig.type, validators);
  }

  private createControl(type: string, validators: ValidatorFn[]): FormControl {
    switch (type) {
      case 'number':
        return this.fb.control(0, { validators, nonNullable: true });
      case 'list':
        return this.fb.control([], { validators, nonNullable: true });
      case 'string':
      default:
        return this.fb.control('', { validators, nonNullable: true });
    }
  }

  private addFormField(control: FormControl, fieldConfig: FormFieldConfig): void {
    const fieldData: FormField = {
      control: control,
      label: fieldConfig.label,
      type: fieldConfig.type,
      size: fieldConfig.size,
      message: this.getErrorMessage(control),
      length: fieldConfig.validations?.max
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
    this.form.updateValueAndValidity();
  }
  
  getErrorMessage(control: FormControl): string | null {
    return ValidationsService.validateInput(control);
  }
  
  

  onSubmit() {
    this.errorMessage = null;
    if (!this.form.valid) return;

    const data = this.form.value;
    this.formSubmit.emit(data);
    this.form.reset();

    this.resetDropdownSelection = true;
    setTimeout(() => this.resetDropdownSelection = false, 0); 
  }
}
