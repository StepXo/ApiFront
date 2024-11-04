import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control: FormControl = new FormControl();
  @Input() label: string = AtomConstants.EMPTY;
  @Input() type: string = 'text'
  @Input() isDisabled: boolean = false;
  @Input() size: EnumSize = EnumSize.Medium;
}

