import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss']
})
export class InputDateComponent   {

  @Input() label!: string;
  @Input() control!: FormControl;

  @Input() isDisabled: boolean = false;
  @Input() size: EnumSize = EnumSize.Medium;

  @Input() minDate?: string;
  @Input() maxDate?: string;
}
