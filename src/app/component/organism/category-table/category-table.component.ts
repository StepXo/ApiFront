import { Component } from '@angular/core';
import { CategoryDto } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent  {
  categories: CategoryDto[] = [];
  
  labels: string[] = ['ID','NOMBRE','DESCRIPCIÓN'];
  values: any[][] = [];

  page: number = 1; 
  size: number = 6; 
  totalPages: number = 1;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.loadCategories();
  }
  
  ngOnChanges(): void {
    this.loadCategories();
  }
  onPageChange(newPage: number): void{
    this.page = newPage;
    this.loadCategories();
  }


  loadCategories(): void {
    this.categoryService.getCategories(this.page - 1, this.size).subscribe({
      next: (data) => {
        this.categories = data.content;
        this.totalPages = data.totalPages;
        this.values = this.categories.map(item => Object.values(item));

      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }
}