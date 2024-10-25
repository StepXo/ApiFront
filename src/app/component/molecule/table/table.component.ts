import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoleculeConstants } from 'src/app/shared/constant/stringConstants/moleculeConstants';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent  {

  @Input() labels: { text: string, isButton: boolean }[] = [];
  @Input() values: (Category | Brand | Item)[][] = [];

  @Output() sortChange = new EventEmitter<string>();

  isAscending: boolean = true;

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending; 
    const order = this.isAscending ? MoleculeConstants.ORDER_UP : MoleculeConstants.ORDER_DOWN; 
    this.sortChange.emit(order);
  }

}
