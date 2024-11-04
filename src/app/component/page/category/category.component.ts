import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  formName = PageConstants.FORM_NAME_C;
  button = {
    label: PageConstants.BUTTON_LABEL,
    size: EnumSize.Medium
  };
  errorMessage: string | null = null;
  formFieldsConfig = [
    {
      name: PageConstants.NAME,
      label: PageConstants.LABEL_NAME,
      type: PageConstants.INPUT,
      size: EnumSize.Medium,
      validations: {
        type: 'string',
        required: true,
        min: PageConstants.MIN_LENGTH, 
        max: PageConstants.MAX_NAME_LENGTH, 
        pattern: PageConstants.PATTERN
      }
    },
    {
      name: PageConstants.DESCRIPTION,
      label: PageConstants.LABEL_DESCRIPTION,
      type: PageConstants.TEXT_AREA,
      size: EnumSize.Medium,
      validations: {
        type: 'string',
        required: true,
        min: PageConstants.MIN_LENGTH, 
        max: PageConstants.MAX_DESCRIPTION_LENGTH_1
      }
    },
  ];

  categories: Category[] = [];
  labels: { text: string, isButton: boolean }[] = [
    { text: PageConstants.ID, isButton: false },
    { text: PageConstants.LABEL_NAME.toUpperCase(), isButton: true },
    { text: PageConstants.LABEL_DESCRIPTION.toUpperCase(), isButton: false },
  ];
  
  pagination = {
    page: PageConstants.FIRST,
    size: PageConstants.PAGE_SIZE,
    totalPages: PageConstants.FIRST,
    order: PageConstants.ORDER
  };
  isLogged!:string | null;
  
  isAdmin!: boolean;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  private checkAdminRole(): void {
    this.isLogged = this.authService.getRole()
    this.isAdmin =  this.isLogged === 'ROLE_ADMIN';


    if (!this.isLogged) {
      this.router.navigate(['/auth-required']);
    }
  }

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  loadData(page: number, size: number, order: string = this.pagination.order): void {
    this.categoryService.getCategories(page - PageConstants.FIRST, size, order).subscribe({
      next: (paginationData) => {
        this.categories = paginationData.content;
        this.pagination.totalPages = paginationData.totalPages;
      },
      error: (error) => {
        console.error(PageConstants.ERROR_CATEGORIES, error);
      }
    });
  }

  onSortChange(sortData: { field: string, order: string }): void {
    this.pagination.order = sortData.order;
    this.pagination.page = PageConstants.FIRST;
    this.loadData(this.pagination.page, this.pagination.size, sortData.order);
  }

  onPageChange(newPage: number): void {
    this.pagination.page = newPage;
    this.loadData(this.pagination.page, this.pagination.size);
  }

  onFormSubmit(data: unknown): void {
    if (!this.isCategoryData(data)) {
      return;
    }

    const category = this.createCategory(data);
    this.categoryService.createCategory(category).subscribe({
      next: () => this.loadData(this.pagination.page, this.pagination.size, this.pagination.order),
      error: (error) => {
        this.errorMessage = ValidationsService.validateCategory(error);
      }
    });
  }

  private isCategoryData(data: unknown): data is Category {
    return typeof data === 'object' && data !== null && 
      'name' in data && 
      'description' in data;
  }

  private createCategory(data: Category): Category {
    return {
      id: data.id,
      name: data.name,
      description: data.description
    };
  }
}
