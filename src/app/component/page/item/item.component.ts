import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
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

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      example: [[],Validators.required]
    });

    this.formField = {
      control: this.form.get('example') as FormControl, 
      label: 'Select Cities',
      type: 'dropdown',
      size: EnumSize.Large,
      message: 'Please select at least one city.'
    };
  }

  listOfItems = [
    { id: 1, name: 'Delhi' },
    { id: 2, name: 'Mumbai' },
    { id: 3, name: 'Kolkata' },
    { id: 4, name: 'Gurugram' },
    { id: 5, name: 'Banglore' },
  ];

}
