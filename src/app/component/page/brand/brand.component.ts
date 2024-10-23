import { Component, OnInit } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { Brand } from 'src/app/shared/models/brand';
import { BrandService } from 'src/app/shared/service/brand/brand.service';
import { ValidationsComponent } from 'src/app/shared/utils/validations/validations.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  formName = PageConstants.FORM_NAME_M;
  button = {
    label:PageConstants.BUTTON_LABEL,
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
        required: true,
        min: PageConstants.MIN_LENGTH, 
        max: PageConstants.MAX_NAME_LENGTH, 
        pattern: PageConstants.PATTERN
      }
    },
    {
      name:PageConstants.DESCRIPTION,
      label: PageConstants.LABEL_DESCRIPTION,
      type: PageConstants.TEXT_AREA,
      size: EnumSize.Medium,
      validations: {
        required: true,
        min: PageConstants.MIN_LENGTH, 
        max: PageConstants.MAX_DESCRIPTION_LENGTH_2
      }
    },
  ];

  brands: Brand[] = [];

  labels: string[] = [PageConstants.ID, 
    PageConstants.LABEL_NAME.toUpperCase(), 
    PageConstants.LABEL_DESCRIPTION.toLowerCase()
  ];

  pagination = {
    page: PageConstants.FIRST,
    size: PageConstants.PAGE_SIZE,
    totalPages: PageConstants.FIRST,
    order: PageConstants.ORDER
  }

  constructor(private readonly brandService: BrandService) {}

  ngOnInit(): void {
    this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
  }

  loadData(page: number, size: number,order: string = this.pagination.order): void {
    this.brandService.getBrands(page - PageConstants.FIRST, size, order).subscribe({
      next: (paginationData) => {
        this.brands = paginationData.content;
        this.pagination.totalPages = paginationData.totalPages;
      },
      error: (error) => {
        console.error(PageConstants.ERROR_BRANDS, error);
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
  

  onFormSubmit(data: any) {
    this.brandService.createBrand(data).subscribe({
        next: () => {
          this.loadData(this.pagination.page, this.pagination.size, this.pagination.order);
        },
        error: (error) => {
          this.errorMessage = ValidationsComponent.validateCategory(error);
        }
    });
  }

}
