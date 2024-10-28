import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { Category } from 'src/app/shared/models/category';
import { Brand } from 'src/app/shared/models/brand';
import { Item } from 'src/app/shared/models/Item';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { CategoryService } from 'src/app/shared/service/category/category.service';
import { ItemService } from 'src/app/shared/service/item/item.service';
import { ValidationsService } from 'src/app/shared/service/validations/validations.service';
import { ItemRequest } from 'src/app/shared/models/ItemRequest';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  constructor(
    private readonly itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  formName = PageConstants.FORM_NAME_I;
  button = {
    label: PageConstants.BUTTON_LABEL,
    size: EnumSize.Medium
  };
  errorMessage: string | null = null;

  items: Item[] = [];

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
      name: 'categoryId',
      label: 'Categoria',
      type: 'dropdown',
      size: EnumSize.Medium,
      validations: {
        type: 'list',
        max: 3,
        required: true,
      }
    },
    {
      name: 'brandId',
      label: 'Marca',
      type: 'dropdown',
      size: EnumSize.Medium,
      validations: {
        type: 'number',
        max: 1,
        required: true,
      }
    },
  ];

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
  }

  loadData(page: number, size: number, order: string = this.pagination.order): void {
    this.itemService.getItem(page - PageConstants.FIRST, size, order).subscribe({
      next: (paginationData) => {
        this.items = paginationData.content;
        this.pagination.totalPages = paginationData.totalPages;
      },
      error: (error) => {
        console.error(PageConstants.ERROR_ITEMS, error);
      }
    });
  }

  onSortChange(order: string): void {
    this.pagination.order = order; 
    this.pagination.page = PageConstants.FIRST;
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  onPageChange(newPage: number): void {
    this.pagination.page = newPage;
    this.loadData(this.pagination.page, this.pagination.size);
  }

  onFormSubmit(itemData: Item | Brand | Category) {
    let item: ItemRequest | undefined;

    // Check for necessary properties in itemData
    if ('quantity' in itemData && 'price' in itemData && 'category' in itemData && 'brand' in itemData) {
      item = {
        name: itemData.name,
        description: itemData.description,
        quantity: itemData.quantity,
        price: itemData.price,
        category: itemData.category.map((category: Category) => category.id), 
        brand: itemData.brand.id 
      };
      console.log(item);

      this.itemService.createItem(item).subscribe({
        next: () => {
          this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
        },
        error: (error) => {
          this.errorMessage = ValidationsService.validateCategory(error);
        }
      });
    } else {
        console.error("Invalid item data submitted:", itemData);
    }
}
}
