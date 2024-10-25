import { Component, HostListener, Input, OnInit} from '@angular/core';
import {FormGroup } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { FormField } from 'src/app/shared/models/formField';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{

  @Input() form!: FormGroup;
  @Input() listOfItems: {id:number,name:string}[] = [];
  @Input() formField!: FormField;

  size = EnumSize.Small

  isOpen = false;
  selectedItems: {id: number, name: string} []= [];
  filteredItems: { id: number, name: string }[] = [];

  ngOnInit(): void {
    this.filteredItems = [...this.listOfItems];
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  setDropdownState(state: boolean) {
    this.isOpen = state;
  }

  selectItem(item: {id: number, name: string}) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(item);
    }
    const selectedIds = this.selectedItems.map(selected => selected.id);
    this.formField.control.setValue(selectedIds);
  }

  isSelected(item: {id: number, name: string}): boolean {
    return this.selectedItems.some(selected => selected.id === item.id);
  }

  removeItem(item: {id: number, name: string}) {
    const index = this.selectedItems.findIndex(selected => selected.id === item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    const selectedIds = this.selectedItems.map(selected => selected.id);
    this.formField.control.setValue(selectedIds);
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement; 
    this.filterItems(target.value);
  }

  filterItems(searchTerm: string) {
    this.filteredItems = this.listOfItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown-container');
    if (dropdown && !dropdown.contains(target)) {
      this.setDropdownState(false);
    }
  }

  clearAllSelections() {
    this.selectedItems = [];
    this.formField.control.setValue([]);
  }
}