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

  pages: (number | string)[] = [];

  updateVisiblePages(): void {
    const pagesArray: (number | string)[] = [];
    let range = 1;
  
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      pagesArray.push(1);
  
      if (this.page >= 4 ) {
        pagesArray.push('...');
      }

      if (this.page<4){
        range = 4 - this.page
      }

      if(this.page > this.totalPages - 3 ){
        range = 4 + this.page - this.totalPages 
      }
  
      const start = Math.max(2, this.page - range);
      const end = Math.min(this.totalPages - 1, this.page + range);
      for (let i = start; i <= end; i++) {
        pagesArray.push(i);
      }
  
      if (this.page + 2 === this.totalPages - 1) {
        pagesArray.push(this.page + 2);
      }
  
      if (this.page + 3 < this.totalPages) {
        pagesArray.push('...');
      }
  
      pagesArray.push(this.totalPages);
    }
  
    this.pages = pagesArray;
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
}
