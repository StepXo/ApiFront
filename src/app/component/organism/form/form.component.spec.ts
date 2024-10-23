import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { By } from '@angular/platform-browser';
import { ErrorLabelComponent } from '../../atom/error-label/error-label.component';
import { InputGroupComponent } from '../../molecule/input-group/input-group.component';
import { ButtonComponent } from '../../atom/button/button.component';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { EnumSize } from 'src/app/shared/constant/enumSize';

class MockCategoryService {
  createCategory = jest.fn();
}

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let categoryService: MockCategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent, ErrorLabelComponent, InputGroupComponent, ButtonComponent],
      providers: [{ provide: CategoryService, useClass: MockCategoryService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.formFieldsConfig = [
      {
        name: 'name',
        label: 'Nombre',
        type: 'input',
        size: EnumSize.Medium,
        validations: {
          required: true,
          min: 3,
          max: 50,
          pattern: '^[A-Z][a-zA-Z0-9 ]*$'
        }
      },
      {
        name: 'description',
        label: 'Descripción',
        type: 'textarea',
        size: EnumSize.Medium,
        validations: {
          required: true,
          min: 3,
          max: 90
        }
      },
    ];

    fixture.detectChanges();
  });

  it('should create the form with two controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
  });

  it('should set formFields correctly', () => {
    expect(component.formFields.length).toBe(2);
    expect(component.formFields[0].label).toBe('Nombre');
    expect(component.formFields[1].label).toBe('Descripción');
  });

  it('should disable the submit button if the form is invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['description'].setValue('');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button.componentInstance.isDisabled).toBe(true);
  });

  it('should enable the submit button if the form is valid', () => {
    component.form.controls['name'].setValue('Valid Name');
    component.form.controls['description'].setValue('Valid Description');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('app-button'));
    expect(button.componentInstance.isDisabled).toBe(false);
  });

  it('should emit form data and reset the form on successful submission', () => {
    component.form.controls['name'].setValue('Valid Name');
    component.form.controls['description'].setValue('Valid Description');

    component.formSubmit.subscribe((data) => {
      expect(data).toEqual({ name: 'Valid Name', description: 'Valid Description' });
    });

    component.onSubmit();

    expect(component.form.value).toEqual({ name: null, description: null });
  });

  it('should not emit form data and reset the form if it is invalid', () => {
    component.form.controls['name'].setValue('');
    component.form.controls['description'].setValue('Valid Description');
    
    component.onSubmit();

    expect(component.formSubmit.observed).toBeFalsy();
    expect(component.form.value).toEqual({ name: '', description: 'Valid Description' });
  });

  it('should display error message if present', () => {
    component.errorMessage = 'Some error occurred';
    fixture.detectChanges();
    const errorLabel = fixture.debugElement.query(By.css('app-error-label'));
    expect(errorLabel).toBeTruthy();
    expect(errorLabel.componentInstance.message).toBe('Some error occurred');
  });
});
