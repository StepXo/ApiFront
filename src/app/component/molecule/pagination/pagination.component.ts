import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number = 1; 
  @Input() totalPages: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();


  pages: (number | string)[] = [];
  isAscending: boolean = true;


  updateVisiblePages(): void {
    const pagesArray: (number | string)[] = [];
  
    if (this.totalPages <= 5) {
      this.addAllPages(pagesArray);
    } else {
      pagesArray.push(1);
  
      if (this.page > 3) {
        pagesArray.push('...');
      }
  
      const range = this.calculateRange();
      this.addMiddlePages(pagesArray, range);
  
      if (this.shouldAddEllipsis()) {
        pagesArray.push('...');
      }
  
      pagesArray.push(this.totalPages);
    }
  
    this.pages = pagesArray;
  }
  
  private addAllPages(pagesArray: (number | string)[]): void {
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
  }
  
  private calculateRange(): number {
    let range = 1;
  
    if (this.page < 4) {
      range = 4 - this.page;
    }
  
    if (this.page > this.totalPages - 3) {
      range = 4 + this.page - this.totalPages;
    }
  
    return range;
  }
  
  private addMiddlePages(pagesArray: (number | string)[], range: number): void {
    const start = Math.max(2, this.page - range);
    const end = Math.min(this.totalPages - 1, this.page + range);
    
    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }
  
    if (this.page + 2 === this.totalPages - 1) {
      pagesArray.push(this.page + 2);
    }
  }
  
  private shouldAddEllipsis(): boolean {
    return this.page  < this.totalPages - 2;
  }

  ngOnChanges(): void {
    this.updateVisiblePages();
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      this.page = page;
      this.pageChange.emit(this.page);
      this.updateVisiblePages();
    }
  }

  loadPreviousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.pageChange.emit(this.page)
      this.updateVisiblePages();
    }
  }

  loadNextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.pageChange.emit(this.page)
      this.updateVisiblePages();
    }
  }

  toggleSortOrder(): void {
    this.isAscending = !this.isAscending; 
    const order = this.isAscending ? 'asc' : 'desc'; 
    this.sortChange.emit(order);
  }
}
