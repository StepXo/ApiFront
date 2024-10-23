import { Category } from './category';

export interface CategoryResponse {
  content: Category[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
}