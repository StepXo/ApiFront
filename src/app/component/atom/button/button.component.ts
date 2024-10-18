import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() size: 'large' | 'medium' | 'small' = 'large'; 
  @Input() isDisabled: boolean = false;

}