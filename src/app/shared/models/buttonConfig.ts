import { EnumSize } from "../constant/enumSize";

export interface ButtonConfig{
    label: string;
    size: EnumSize;
    route: string;
    isDisabled?: boolean;
}