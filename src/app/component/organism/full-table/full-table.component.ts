import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Pagination } from 'src/app/shared/constant/pagination';

@Component({
  selector: 'app-full-table',
  templateUrl: './full-table.component.html',
  styleUrls: ['./full-table.component.scss']
})
export class FullTableComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: any[] = [];
  @Input() pagination: Pagination = {page: 1,size:10,totalPages:1, order:'asc'}
  @Output() sortChange = new EventEmitter<string>();


  @Input() loadDataFunction!: (page: number, size: number) => void;

  values: any[][] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateTableValues();
    }
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

  onSortChange(newOrder: string): void {
    this.sortChange.emit(newOrder);  }
}