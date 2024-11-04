import { EnumSize } from "../constant/enumSize";
import { DropdownDataService } from "./dropdownDataService";
import { ValidationConfig } from "./validationConfig";

export interface FormFieldConfig {
    name: string;
    label: string;
    type: string;
    size: EnumSize;
    validations?: ValidationConfig;
    dataService?: DropdownDataService;

}