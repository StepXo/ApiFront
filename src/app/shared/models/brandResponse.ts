import { Brand } from "./brand";

export interface BrandResponse {
    content: Brand[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
}