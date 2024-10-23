import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TextareaComponent } from './textarea.component';
import { EnumSize } from 'src/app/shared/constant/enumSize';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    component.control = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust the height of the textarea', () => {
    const textareaElement = fixture.nativeElement.querySelector('textarea');
    textareaElement.value = 'Test input';
    textareaElement.style.height = 'auto';
    
    textareaElement.dispatchEvent(new Event('input'));
    fixture.detectChanges(); 

    expect(textareaElement.style.height).toBe(`${textareaElement.scrollHeight}px`);
  });

  it('should have default values for inputs', () => {
    expect(component.label).toBe('');
    expect(component.isDisabled).toBe(false);
    expect(component.size).toBe(EnumSize.Medium);
  });

  it('should apply error class when control is invalid and touched', () => {
    component.control.setErrors({ required: true });
    component.control.markAsTouched();
    fixture.detectChanges();
    
    const textareaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement.classList).toContain('error');
  });

  it('should not apply error class when control is invalid but not touched', () => {
    component.control.setErrors({ required: true });
    fixture.detectChanges();

    const textareaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement.classList).not.toContain('error');
  });

  it('should apply disabled attribute when isDisabled is true', () => {
    component.isDisabled = true;
    fixture.detectChanges();
    
    const textareaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement.hasAttribute('disabled')).toBe(true);
  });

  it('should not apply disabled attribute when isDisabled is false', () => {
    component.isDisabled = false;
    fixture.detectChanges();
    
    const textareaElement = fixture.nativeElement.querySelector('textarea');
    expect(textareaElement.hasAttribute('disabled')).toBe(false);
  });
});
