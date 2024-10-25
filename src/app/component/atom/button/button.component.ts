import { Component, Input } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = AtomConstants.EMPTY;
  @Input() size: EnumSize = EnumSize.Medium; 
  @Input() isDisabled: boolean = false;
  @Input() route: string = AtomConstants.EMPTY;
  

}