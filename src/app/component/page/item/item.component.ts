import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { Category } from 'src/app/shared/models/category';
import { FormField } from 'src/app/shared/models/formField';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  public Array = Array;

  form: FormGroup;
  formField: FormField;
  listOfItems: Category[] = [
    { id: 1, name: 'Delhi', description: 'Capital of India' },
    { id: 2, name: 'Mumbai', description: 'Financial capital of India' },
    { id: 3, name: 'Kolkata', description: 'City of Joy' },
    { id: 4, name: 'Gurugram', description: 'IT hub near Delhi' },
    { id: 5, name: 'Bangalore', description: 'Silicon Valley of India' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      example: ["",Validators.required]
    });

    this.formField = {
      control: this.form.get('example') as FormControl, 
      label: 'Select Cities',
      type: 'dropdown',
      size: EnumSize.Large,
      message: 'Please select at least one city.',
      data:this.listOfItems
    };
  }


  

}
