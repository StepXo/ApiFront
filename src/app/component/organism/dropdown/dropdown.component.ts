import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { DropdownItem } from 'src/app/shared/models/dropdownItem';
import { FormField } from 'src/app/shared/models/formField';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() formField!: FormField;
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;
  @Input() resetSelection: boolean = false;
  @Output() serviceCall = new EventEmitter<string>();

  size = EnumSize.Small;
  isOpen = false;
  selectedItems: DropdownItem[] = [];
  filteredItems: DropdownItem[] = [];
  data: DropdownItem[] = [];

  ngOnInit(): void {
    if (this.formField.dataService) {
      this.loadData();
    }
    const control = this.formField.control;

    control.valueChanges.subscribe(() => {
      this.updateErrorMessage(control);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetSelection'] && changes['resetSelection'].currentValue === true) {
      this.clearAllSelections();
    }
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

  private loadData(): void {
    this.formField.dataService?.getData().subscribe({
      next: (data) => {
        this.data = data;
        this.filteredItems = data;
      },
      error: (error) => {
        console.error('Error loading data:', error);
      }
    });
  }

  toggleDropdown() {
    if (!this.isInputDisabled()) {
      this.isOpen = !this.isOpen;
    }
  }

  setDropdownState(state: boolean) {
    if (!this.isInputDisabled()) {
      this.isOpen = state;
    }
  }

  selectItem(item: DropdownItem) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
    const selectedIds = this.selectedItems.map(selected => selected.id);
    this.formField.control.setValue(selectedIds);
    this.formField.control.markAsDirty();
  }

  isSelected(item: DropdownItem): boolean {
    return this.selectedItems.some(selected => selected.id === item.id);
  }

  removeItem(item: DropdownItem) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    const selectedIds = this.selectedItems.map(selected => selected.id);
    this.formField.control.setValue(selectedIds);
  }

  private debounceTimer!: ReturnType<typeof setTimeout>;

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
    const max = this.formField.length ?? Infinity;
    return this.selectedItems.length >= max;
  }
}
