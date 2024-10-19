import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationsComponent } from 'src/app/shared/utils/validations/validations.component';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() fields: { control: FormControl, label: string, type:string, size:'normal' | 'small'}[] = [];

  getErrorMessage(control: FormControl): string | null {
    return ValidationsComponent.validateInput(control);
  }

}

