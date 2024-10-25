import { Item } from "./Item";

export interface ItemResponse {
    content: Item[];
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
}