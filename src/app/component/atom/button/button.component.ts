import { Component, Input } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() size: EnumSize = EnumSize.Medium; 
  @Input() isDisabled: boolean = false;
  @Input() route: string = ""

}