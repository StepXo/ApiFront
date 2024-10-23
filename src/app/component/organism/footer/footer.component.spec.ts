import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { LogoComponent } from '../../atom/logo/logo.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, LogoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display contact information', () => {
    const compiled = fixture.nativeElement;
    const contactItems = compiled.querySelectorAll('.footer-contact li');
    
    expect(contactItems.length).toBe(component.contactInfo.length);
    expect(contactItems[0].textContent).toContain('Email: contact@example.com');
    expect(contactItems[1].textContent).toContain('Phone: +123 456 7890');
    expect(contactItems[2].textContent).toContain('Address: 123 Example St, City, Country');
  });

  it('should display the copyright message', () => {
    const compiled = fixture.nativeElement;
    const copyrightText = compiled.querySelector('.footer-copyright p').textContent;

    expect(copyrightText).toContain('© 2024 Your Company. All Rights Reserved.');
  });
});
