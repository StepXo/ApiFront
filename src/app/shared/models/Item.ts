import { Brand } from "./brand";
import { Category } from "./category";

export interface Item {
    id:number;
    name: string;
    description: string;
    quantity: number; 
    price: number;
    category: Category[];
    brand: Brand ;
}