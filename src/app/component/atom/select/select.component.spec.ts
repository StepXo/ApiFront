import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SelectComponent } from './select.component';
import { DebugElement } from '@angular/core';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let selectElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    selectElement = fixture.debugElement.query(By.css('select'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the placeholder when no value is selected', () => {
    component.placeholder = 'Select an option';
    component.selectedValue = null;
    fixture.detectChanges();

    const placeholderOption = selectElement.nativeElement.querySelector('option[value=""]');
    expect(placeholderOption.textContent).toContain('Select an option');
  });

  it('should populate options correctly', () => {
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    fixture.detectChanges();

    const options = selectElement.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[1].textContent).toContain('Option 1');
    expect(options[2].textContent).toContain('Option 2');
  });

  it('should emit the selected value on change', () => {
    const emitSpy = jest.spyOn(component.valueChange, 'emit');
  
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    fixture.detectChanges();
  
    const selectElement = fixture.debugElement.query(By.css('select'));
  
    selectElement.nativeElement.value = '2';
    selectElement.triggerEventHandler('change', { target: selectElement.nativeElement });
    fixture.detectChanges();
  
    expect(emitSpy).toHaveBeenCalledWith('2');
  });

  it('should set selected value correctly', () => {
    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    component.selectedValue = '1';
    fixture.detectChanges();

    expect(selectElement.nativeElement.value).toBe('1');
  });
});
