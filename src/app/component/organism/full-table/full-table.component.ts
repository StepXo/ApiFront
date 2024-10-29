import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Pagination } from 'src/app/shared/constant/pagination';
import { Brand } from 'src/app/shared/models/brand';
import { Category } from 'src/app/shared/models/category';
import { Item } from 'src/app/shared/models/Item';

@Component({
  selector: 'app-full-table',
  templateUrl: './full-table.component.html',
  styleUrls: ['./full-table.component.scss']
})
export class FullTableComponent implements OnChanges {
  @Input() labels: { text: string, isButton: boolean }[] = [];
  @Input() data: (Category | Brand | Item)[] = [];
  @Input() pagination: Pagination = { page: 1, size: 10, totalPages: 1, order: 'asc' };
  @Output() sortChange = new EventEmitter<{ field: string; order: string }>();

  @Input() loadDataFunction!: (page: number, size: number) => void;

  values: (Category | Brand | Item)[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateTableValues();
    }
  }

  onTableSizeChange(newSize: number): void {
    this.pagination.size = newSize;
    this.pagination.page = 1;
    this.loadData();
  }

  onPageChange(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.loadDataFunction) {
      this.loadDataFunction(this.pagination.page, this.pagination.size);
      this.values = this.data.map(item => Object.values(item));
    }
  }

  updateTableValues(): void {
    this.values = this.data.map(item => Object.values(item));
  }

  onSortChange(sortData: { field: string, order: string }): void {
    this.pagination.order = sortData.order;
    this.sortChange.emit(sortData);
  }
}