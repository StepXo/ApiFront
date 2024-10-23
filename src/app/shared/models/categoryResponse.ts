import { CategoryDto } from './category';

export interface CategoryResponse {
    content: CategoryDto[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
  }