import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateComponent } from './input-date.component';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(); 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct label input', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    expect(component.label).toBe('Test Label');
  });

  it('should set FormControl correctly', () => {
    const formControl = new FormControl();
    component.control = formControl;
    fixture.detectChanges();
    expect(component.control).toBe(formControl);
  });

  it('should set isDisabled input correctly', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    expect(component.isDisabled).toBe(true);
  });

  it('should set size input to default EnumSize.Medium', () => {
    expect(component.size).toBe(EnumSize.Medium);
  });

  it('should accept minDate and maxDate as inputs', () => {
    component.minDate = '2023-01-01';
    component.maxDate = '2023-12-31';
    fixture.detectChanges();
    expect(component.minDate).toBe('2023-01-01');
    expect(component.maxDate).toBe('2023-12-31');
  });
});
