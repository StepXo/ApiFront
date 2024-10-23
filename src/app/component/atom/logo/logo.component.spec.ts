import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { By } from '@angular/platform-browser';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default src value', () => {
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('assets/images/logo.png');
  });

  it('should display the correct alt text', () => {
    component.alt = 'Test Logo';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.alt).toBe('Test Logo');
  });

  it('should apply the correct size class', () => {
    component.size = 'medium';
    fixture.detectChanges(); 

    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement.classes['medium']).toBeTruthy();
  });

  it('should update the src input dynamically', () => {
    component.src = 'assets/images/test-logo.png';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('assets/images/test-logo.png');
  });
});
