import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { Item } from 'src/app/shared/models/Item';
import { ItemService } from 'src/app/shared/service/item/item.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';
import { ItemRequest } from 'src/app/shared/models/ItemRequest';
import { DisplayItem } from 'src/app/shared/models/displayItem';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { BrandService } from 'src/app/shared/service/brand/brand.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  currentSortField: string = 'name';
  isDescendingOrder: boolean = true;
  formName = PageConstants.FORM_NAME_I;
  button = {
    label: PageConstants.BUTTON_LABEL,
    size: EnumSize.Medium
  };
  errorMessage: string | null = null;
  items: DisplayItem[] = [];

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
        max: PageConstants.MAX_DESCRIPTION_LENGTH_2
      }
    },
    {
      name: 'quantity',
      label: "Existencias",
      type: PageConstants.INPUT,
      size: EnumSize.Medium,
      validations: {
        isInteger: true,
        min: 0,
        type: 'number',
        required: true,
      }
    },
    {
      name: 'price',
      label: 'Precio',
      type: PageConstants.INPUT,
      size: EnumSize.Medium,
      validations: {
        type: 'number',
        required: true,
      }
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'dropdown',
      size: EnumSize.Medium,
      validations: {
        type: 'list',
        max: 3,
        required: true,
      },
      dataService: this.categoryService

    },
    {
      name: 'brand',
      label: 'Marca',
      type: 'dropdown',
      size: EnumSize.Medium,
      validations: {
        type: 'list',
        max: 1,
        required: true,
      },
      dataService: this.brandService
    },
  ];

  labels: { text: string, isButton: boolean }[] = [
    { text: PageConstants.ID, isButton: false },
    { text: PageConstants.LABEL_NAME.toUpperCase(), isButton: true },
    { text: PageConstants.LABEL_DESCRIPTION.toUpperCase(), isButton: false },
    { text: "Existencias".toUpperCase(), isButton: false },
    { text: "Precio".toUpperCase(), isButton: false },
    { text: "Categoria".toUpperCase(), isButton: true },
    { text: "Marca".toUpperCase(), isButton: true },
  ];

  pagination = {
    page: PageConstants.FIRST,
    size: PageConstants.PAGE_SIZE,
    totalPages: PageConstants.FIRST,
    order: PageConstants.ORDER
  }

  isLogged!: string | null;
  isAdmin!: boolean;

  constructor(
    private readonly itemService: ItemService,
    private readonly authService: AuthService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  private checkAdminRole(): void {
    this.isLogged = this.authService.getRole();
    this.isAdmin = this.isLogged === 'ROLE_ADMIN';

    if (!this.isLogged) {
      this.router.navigate(['/auth-required']);
    }
  }

  loadData(page: number, size: number, order: string = this.pagination.order, orderField: string = this.currentSortField): void {
    const adjustedPage = page - PageConstants.FIRST;
    let observable;
  
    if (orderField === 'name') {
      observable = this.itemService.getItem(adjustedPage, size, order);
    } else {
      observable = this.itemService.getItemByField(adjustedPage, size, order, orderField);
    }
  
    observable.subscribe({
      next: (paginationData) => {
        this.items = this.transformToDisplayItems(paginationData.content);
        this.pagination.totalPages = paginationData.totalPages;
      },
      error: (error) => {
        console.error(PageConstants.ERROR_ITEMS, error);
      }
    });
  }

  onSortChange(sortData: { field: string, order: string }): void {
    const { field, order } = sortData;
    
    this.currentSortField = this.getFieldNameFromLabel(field) ?? 'name';
    this.isDescendingOrder = order === 'desc';

    this.pagination.order = order;
    this.pagination.page = PageConstants.FIRST;

    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order, this.currentSortField);
  }

  private getFieldNameFromLabel(label: string): string | undefined {
    const fieldConfig = this.formFieldsConfig.find(config => config.label.toUpperCase() === label);
    return fieldConfig?.name;
  }

  onPageChange(newPage: number): void {
    this.pagination.page = newPage;
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order, this.currentSortField);
  }

  onFormSubmit(data: unknown): void {
    if (!this.isItemRequestData(data)) {
      console.error("Datos no válidos recibidos en onSubmit:", data);
      return;
    }

    const itemRequest = this.createItemRequest(data);
    this.itemService.createItem(itemRequest).subscribe({
      next: () => this.loadData(this.pagination.page, this.pagination.size, this.pagination.order),
      error: (error) => {
        console.error('Error en createItem:', error);
        this.errorMessage = ValidationsService.validateItem(error);
      }
    });
  }

  private isItemRequestData(data: unknown): data is ItemRequest {
    return typeof data === 'object' && data !== null && 
      'quantity' in data && 
      'price' in data && 
      'category' in data && 
      'brand' in data;
  }

  private createItemRequest(data: ItemRequest): ItemRequest {
    return {
      name: data.name,
      description: data.description,
      quantity: Number(data.quantity),
      price: Number(data.price),
      category: data.category,
      brand: Number(data.brand)
    };
  }

  transformToDisplayItems(items: Item[]): DisplayItem[] {
    return items.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      category: item.category.map(category => category.name),
      brand: item.brand.name
    }));
  }
}
