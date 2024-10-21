import { Component} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/service/category/category.service'; 
import { ValidationsComponent } from 'src/app/shared/utils/validations/validations.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent  {
  formName: string = "Crear Categoria";
  form: FormGroup;
  formFields: {control:FormControl, label: string, type:string, size:'normal' | 'small', message:string | null }[];
  buttonLabel: string = 'Enviar'
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.form = this.fb.group({
      name: ['',[Validators.required,Validators.maxLength(50)]],
      description: ['',[Validators.required,Validators.maxLength(90)]],
    });

    this.formFields = [
      {control: this.form.get('name') as FormControl, 
        label: 'Nombre',type:'input',
        size:'normal', 
        message: this.getErrorMessage(this.form.get('name') as FormControl)},
      {control: this.form.get('description') as FormControl, 
        label: 'Descripción',
        type:'textarea',size:'normal', 
        message: this.getErrorMessage(this.form.get('description') as FormControl)},
    ];
  }
  
  get isDisabled(): boolean {
    return !this.form.valid;
  }

  getErrorMessage(control: FormControl): string | null {
    return ValidationsComponent.validateInput(control);
  }

  onSubmit() {
    if (!this.form.valid) {}
    const categoryData = this.form.value;
    this.categoryService.createCategory(categoryData).subscribe({
      next: () => {
        this.form.reset();
      },
      error: (error) => {
        this.errorMessage = ValidationsComponent.validateCategory(error);}
    });
  }
}

