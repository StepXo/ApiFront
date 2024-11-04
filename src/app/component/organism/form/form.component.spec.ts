import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { FormFieldConfig } from 'src/app/shared/models/formFieldConfig';
import { ItemRequest } from 'src/app/shared/models/ItemRequest';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  const mockFormFieldsConfig: FormFieldConfig[] = [
    { name: 'name', label: 'Name', type: 'string', size: EnumSize.Medium, validations: { required: true, min: 3, type: 'text' } },
    { name: 'description', label: 'Description', size: EnumSize.Medium, type: 'string', validations: { required: true, type: 'text' } },
    { name: 'quantity', label: 'Quantity', type: 'number', size: EnumSize.Medium, validations: { required: true, min: 1, type: 'number' } },
    { name: 'price', label: 'Price', type: 'number', size: EnumSize.Medium, validations: { required: true, type: 'number' } },
    { name: 'category', label: 'Category', type: 'dropdown', size: EnumSize.Medium, validations: { required: true, type: 'list' } },
    { name: 'brand', label: 'Brand', type: 'dropdown', size: EnumSize.Medium, validations: { required: true, type: 'list' } }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.formFieldsConfig = mockFormFieldsConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit event with form data on valid form submission', () => {
    component.ngOnInit();
    const formData: ItemRequest = {
      name: 'Test Item',
      description: 'Description',
      quantity: 5,
      price: 100,
      category: [1],
      brand: 1
    };

    const formSubmitSpy = jest.spyOn(component.formSubmit, 'emit');
    component.form.setValue(formData);
    component.form.updateValueAndValidity();
    expect(component.form.valid).toBe(true);

    component.onSubmit();

    expect(formSubmitSpy).toHaveBeenCalledWith(formData);
    expect(component.form.valid).toBe(false); 
  });

  it('should reset the form and dropdown selections after form submission', (done) => {
    component.ngOnInit();
    component.form.controls['name'].setValue('Test Item');
    component.form.controls['description'].setValue('Description');
    component.form.controls['quantity'].setValue(5);
    component.form.controls['price'].setValue(100);
    component.form.controls['category'].setValue([1]);
    component.form.controls['brand'].setValue([1]);

    component.onSubmit();

    expect(component.resetDropdownSelection).toBe(true);

    setTimeout(() => {
      expect(component.resetDropdownSelection).toBe(false);
      done();
    }, 0);
  });

  it('should return isDisabled as true when form is invalid', () => {
    component.ngOnInit();

    component.form.updateValueAndValidity();
    expect(component.isDisabled).toBe(true);

    component.form.controls['name'].setValue('Test');
    component.form.controls['description'].setValue('Test Description');
    component.form.controls['quantity'].setValue(10);
    component.form.controls['price'].setValue(100);
    component.form.controls['category'].setValue([1]);
    component.form.controls['brand'].setValue([1]);

    component.form.updateValueAndValidity();
    expect(component.isDisabled).toBe(false);
  });

  it('should validate and display errors for invalid input fields', () => {
    component.ngOnInit();
    component.form.controls['name'].setValue('');
    component.form.controls['description'].setValue('');
    component.form.controls['quantity'].setValue(null);
    component.form.controls['price'].setValue(null);

    component.form.updateValueAndValidity();
    
    expect(component.form.controls['name'].invalid).toBe(true);
    expect(component.form.controls['description'].invalid).toBe(true);
    expect(component.form.controls['quantity'].invalid).toBe(true);
    expect(component.form.controls['price'].invalid).toBe(true);
  });

  it('should create a FormControl of type list ([])', () => {
    const fieldConfig: FormFieldConfig = {
      name: 'testList',
      label: 'Test List',
      type: 'list',
      size: EnumSize.Medium,
      validations: { type:"text",required: true }
    };

    const control = component['getControl'](fieldConfig);
    expect(control.value).toEqual([]); 
    expect(control).toBeInstanceOf(FormControl);
  });

  it('should update the error message in updateErrorMessage if the field exists', () => {
    const fieldConfig: FormFieldConfig = {
      name: 'testField',
      label: 'Test Field',
      type: 'string',
      size: EnumSize.Medium,
      validations: { type:"text",required: true }
    };

    component.formFieldsConfig = [fieldConfig];
    component.ngOnInit();

    const control = component.form.controls['testField'] as FormControl;
    control.setErrors({ required: true }); 

    component.updateErrorMessage(control); 

    const field = component.formFields.find(f => f.control === control);
    expect(field).toBeTruthy();
    expect(field?.message).toBe('Este campo es requerido.');
  });
});
