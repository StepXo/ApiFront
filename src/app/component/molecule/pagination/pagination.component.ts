import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MoleculeConstants } from 'src/app/shared/constant/stringConstants/moleculeConstants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() page: number = MoleculeConstants.ONE; 
  @Input() totalPages: number = MoleculeConstants.ONE;
  @Output() pageChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<{ field: string, order: string }>();
  @Output() tableSizeChange = new EventEmitter<number>();

  tableSizes = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
  ];
  pages: (number | string)[] = [];
  isAscending: boolean = true;
  currentSortField: string = 'name';

  updateVisiblePages(): void {
    const pagesArray: (number | string)[] = [];
  
    if (this.totalPages <= MoleculeConstants.FIVE) {
      this.addAllPages(pagesArray);
    } else {
      pagesArray.push(MoleculeConstants.ONE);
  
      if (this.page > MoleculeConstants.THREE) {
        pagesArray.push(MoleculeConstants.SPACER);
      }
  
      const range = this.calculateRange();
      this.addMiddlePages(pagesArray, range);
  
      if (this.shouldAddEllipsis()) {
        pagesArray.push(MoleculeConstants.SPACER);
      }
  
      pagesArray.push(this.totalPages);
    }
  
    this.pages = pagesArray;
  }
  
  private addAllPages(pagesArray: (number | string)[]): void {
    for (let i = MoleculeConstants.ONE; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
  }
  
  private calculateRange(): number {
    let range = MoleculeConstants.ONE;
  
    if (this.page < MoleculeConstants.FOUR) {
      range = MoleculeConstants.FOUR - this.page;
    }
  
    if (this.page > this.totalPages - MoleculeConstants.THREE) {
      range = MoleculeConstants.FOUR + this.page - this.totalPages;
    }
  
    return range;
  }
  
  private addMiddlePages(pagesArray: (number | string)[], range: number): void {
    const start = Math.max(MoleculeConstants.TWO, this.page - range);
    const end = Math.min(this.totalPages - MoleculeConstants.ONE, this.page + range);
    
    for (let i = start; i <= end; i++) {
      pagesArray.push(i);
    }
  
    if (this.page + MoleculeConstants.TWO === this.totalPages - MoleculeConstants.ONE) {
      pagesArray.push(this.page + MoleculeConstants.TWO);
    }
  }
  
  private shouldAddEllipsis(): boolean {
    return this.page  < this.totalPages - MoleculeConstants.THREE;
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
    if (this.page > MoleculeConstants.ONE) {
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

  toggleSortOrder(field: string): void {
    this.isAscending = this.currentSortField === field ? !this.isAscending : true;
    this.currentSortField = field;
    const order = this.isAscending ? 'asc' : 'desc';
    this.sortChange.emit({ field, order });
  }

  updateTableSize(newSize: string | number): void {
    const size = Number(newSize);  
    this.tableSizeChange.emit(size);
  }
}
