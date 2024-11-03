export interface ValidationConfig {
    type:string;
    min?: number;
    max?: number;
    required?: boolean;
    pattern?: string;
    email?: boolean;
    isInteger?: boolean;
    maxDate?: string;
    minDate?:string;
    ageDate?:string;
}