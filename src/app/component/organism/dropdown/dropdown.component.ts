import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';
import { FormField } from 'src/app/shared/models/formField';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() formField!: FormField;

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;

  size = EnumSize.Small;

  isOpen = false;
  selectedItems: (Brand | Category)[] = [];
  filteredItems: (Brand | Category)[] = [];
  data:(Brand | Category)[] = [];

  constructor(
    private readonly categoryService: CategoryService,
    private readonly brandService:BrandService 
  ){}

  ngOnInit(): void {
    this.loadData(this.formField.label);
    const control = this.formField.control

    control.valueChanges.subscribe(() => {
      this.updateErrorMessage(control);
    });
  }

  updateErrorMessage(control: FormControl): void {
    const field = this.formField;
    if (field) {
      field.message = this.getErrorMessage(control);
    }
  }

  getErrorMessage(control: FormControl): string | null {
    return ValidationsService.validateInput(control);
  }

  loadData(name: string): void {
    if (name === 'Categoria') {
      this.categoryService.getCategoryList().subscribe(
        data => {
          this.data = data;
          this.filteredItems = [...this.data];
        },
        error => {
          console.error('Error loading categories:', error);
        }
      );
    }
    if (name === 'Marca') {
      this.brandService.getBrandList().subscribe(
        data => {
          this.data = data;
          this.filteredItems = [...this.data];
        },
        error => {
          console.error('Error loading brands:', error);
        }
      );
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setDropdownState(state: boolean) {
    this.isOpen = state;
  }

  selectItem(item: Brand | Category) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    index >= 0 ? this.selectedItems.splice(index, 1) : this.selectedItems.push(item);
    this.formField.control.setValue(this.selectedItems.map(selected => selected.id));
  }
  

  isSelected(item: Brand | Category): boolean {
    return this.selectedItems.some(selected => selected.id === item.id);
  }

  removeItem(item: Brand | Category) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    const selectedIds = this.selectedItems.map(selected => selected.id);
    this.formField.control.setValue(selectedIds);
  }

  private debounceTimer: any;

  onInputChange(event: Event) {
    clearTimeout(this.debounceTimer);
    const target = event.target as HTMLInputElement;
    this.debounceTimer = setTimeout(() => {
      this.filterItems(target.value);
    }, 300);
  }

  private filterItems(searchTerm: string) {
    this.filteredItems = this.data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  clearAllSelections() {
    this.selectedItems = [];
    this.formField.control.setValue([]);
  }

  isInputDisabled(): boolean {
    const max = this.formField.label === 'Categoria' ? 3 : 1;
    return this.selectedItems.length >= max;
  }
}
