import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputGroupComponent } from './input-group.component';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-input',
  template: '<input/>'
})
class MockInputComponent {
  control!: FormControl;
  label!: string;
  type!: string;
  size!: EnumSize;
}

@Component({
  selector: 'app-error-label',
  template: '<div>{{ message }}</div>'
})
class MockErrorLabelComponent {
  message!: string | null;
}

describe('InputGroupComponent', () => {
  let component: InputGroupComponent;
  let fixture: ComponentFixture<InputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        InputGroupComponent,
        MockInputComponent,
        MockErrorLabelComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InputGroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the input fields', () => {
    component.fields = [
      { control: new FormControl('', []), label: 'First Name', type: 'text', size: EnumSize.Medium, message: null },
      { control: new FormControl('', []), label: 'Last Name', type: 'text', size: EnumSize.Medium, message: null }
    ];

    fixture.detectChanges();

    const inputElements = fixture.nativeElement.querySelectorAll('app-input');
    expect(inputElements.length).toBe(2);
    expect(inputElements[0].label).toBe('First Name');
    expect(inputElements[1].label).toBe('Last Name');
  });

  it('should render error labels when control is invalid and touched', () => {
    const control = new FormControl('', { updateOn: 'blur' });
    control.setErrors({ required: true });
    control.markAsTouched();

    component.fields = [
      { control, label: 'First Name', type: 'text', size: EnumSize.Medium, message: 'First Name is required' }
    ];

    fixture.detectChanges();

    const errorLabel = fixture.nativeElement.querySelector('app-error-label');
    expect(errorLabel).toBeTruthy();
    expect(errorLabel.message).toBe('First Name is required');
  });

  it('should not render error labels when control is valid', () => {
    const control = new FormControl('Valid', []);
    
    component.fields = [
      { control, label: 'First Name', type: 'text', size: EnumSize.Medium, message: 'First Name is required' }
    ];

    fixture.detectChanges();

    const errorLabel = fixture.nativeElement.querySelector('app-error-label');
    expect(errorLabel).toBeNull();
  });

  it('should not render error labels when control is touched but valid', () => {
    const control = new FormControl('Valid', []);
    control.markAsTouched();

    component.fields = [
      { control, label: 'First Name', type: 'text', size: EnumSize.Medium, message: 'First Name is required' }
    ];

    fixture.detectChanges();

    const errorLabel = fixture.nativeElement.querySelector('app-error-label');
    expect(errorLabel).toBeNull();
  });
});
