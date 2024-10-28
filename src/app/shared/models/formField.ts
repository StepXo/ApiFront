import { FormControl } from "@angular/forms";
import { EnumSize } from "../constant/enumSize";
import { Brand } from "./brand";
import { Category } from "./category";

export interface FormField {
    control: FormControl;
    label: string;
    type: string;
    size: EnumSize;
    message: string | null;
}