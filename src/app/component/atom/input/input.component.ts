import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() value: string = '';
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() isDisabled: boolean = false;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  handleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value); // Emitir el valor del input
  }

}
