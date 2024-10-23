import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorLabelComponent } from './error-label.component';
import { By } from '@angular/platform-browser';

describe('ErrorLabelComponent', () => {
  let component: ErrorLabelComponent;
  let fixture: ComponentFixture<ErrorLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorLabelComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the message when message input is provided', () => {
    component.message = 'Error occurred!';
    fixture.detectChanges();

    const spanElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanElement.textContent.trim()).toBe('Error occurred!');
  });

  it('should not display the message when message input is null', () => {
    component.message = null;
    fixture.detectChanges();

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement).toBeFalsy();
  });

  it('should display an empty string if message input is an empty string', () => {
    component.message = '';
    fixture.detectChanges();

    const spanElement = fixture.debugElement.query(By.css('span'));
    expect(spanElement).toBeFalsy();
  });
});
