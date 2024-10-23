import { FormControl } from "@angular/forms";
import { EnumSize } from "../constant/enumSize";

export interface FormField {
    control: FormControl;
    label: string;
    type: string;
    size: EnumSize;
    message: string | null;
}