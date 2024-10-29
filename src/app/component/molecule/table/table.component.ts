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
export class TableComponent {

  @Input() labels: { text: string, isButton: boolean }[] = [];
  @Input() values: (Category | Brand | Item)[][] = [];
  @Output() sortChange = new EventEmitter<{ field: string, order: string }>();

  currentSortField: string | null = null;
  isAscending: { [key: string]: boolean } = {};

  toggleSortOrder(field: string): void {
    this.isAscending[field] = !this.isAscending[field];

    for (const key in this.isAscending) {
      if (key !== field) {
        this.isAscending[key] = true;
      }
    }

    const order = this.isAscending[field] ? 'asc' : 'desc';
    this.sortChange.emit({ field, order });
  }
}
