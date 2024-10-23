import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;
  @Input() size: EnumSize = EnumSize.Medium;
}

