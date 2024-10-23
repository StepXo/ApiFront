import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct labels in the header', () => {
    component.labels = ['Header 1', 'Header 2'];
    fixture.detectChanges();
    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toBe(2);
    expect(headerCells[0].nativeElement.textContent).toContain('Header 1');
    expect(headerCells[1].nativeElement.textContent).toContain('Header 2');
  });

  it('should display correct values in the table body', () => {
    component.labels = ['Header 1', 'Header 2'];
    component.values = [['Row 1 Col 1', 'Row 1 Col 2'], ['Row 2 Col 1', 'Row 2 Col 2']];
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('Row 1 Col 1');
    expect(rows[0].nativeElement.textContent).toContain('Row 1 Col 2');
    expect(rows[1].nativeElement.textContent).toContain('Row 2 Col 1');
    expect(rows[1].nativeElement.textContent).toContain('Row 2 Col 2');
  });

  it('should handle empty labels and values gracefully', () => {
    component.labels = [];
    component.values = [];
    fixture.detectChanges();
    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(headerCells.length).toBe(0);
    expect(rows.length).toBe(0);
  });
});
