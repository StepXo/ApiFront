import { FormControl } from "@angular/forms";
import { EnumSize } from "../constant/enumSize";
import { DropdownDataService } from "./dropdownDataService";

export interface FormField {
    control: FormControl;
    label: string;
    type: string;
    size: EnumSize;
    message: string | null;
    length?: number;
    minDate?:string;
    maxDate?:string;
    dataService?: DropdownDataService;
}