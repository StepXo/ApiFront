import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { CategoryDto } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent   {
  formName = "Crear Categoria";
  button = {
    label:"Enviar",
    size: EnumSize.Medium
  };

  formFieldsConfig = [
    {
      name: 'name',
      label: 'Nombre',
      type: 'input',
      size: EnumSize.Medium,
      validations: {
        required: true,
        min: 3, 
        max: 50, 
        pattern: '^[a-zA-Z0-9 ]*$'
      }
    },
    {
      name:'description',
      label: 'Descripción',
      type: 'textarea',
      size: EnumSize.Medium,
      validations: {
        required: true,
        min: 3, 
        max: 90
      }
    },
  ];

  categories: CategoryDto[] = [];

  labels: string[] = ['ID', 'Nombre', 'Descripción'];

  pagination = {
    page: 1,
    size:5,
    totalPages:1,
    order: 'asc'
  }

  constructor(private readonly categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  loadData(page: number, size: number,order: string = this.pagination.order): void {
    this.categoryService.getCategories(page - 1, size, order).subscribe({
      next: (paginationData) => {
        this.categories = paginationData.content;
        this.pagination.totalPages = paginationData.totalPages;
      },
      error: (error) => {
        console.error('Error fetching categories', error);
      }
    });
  }

  onSortChange(order: string): void {
    console.log("llamado, page", order )
    this.pagination.order = order; 
    this.pagination.page = 1;
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  onPageChange(newPage: number): void {
    this.pagination.page = newPage;
    this.loadData(this.pagination.page, this.pagination.size);
  }

}
