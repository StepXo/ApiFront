import { Component, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements AfterViewChecked {
  @Input() placeholder: string = '';
  @Input() size: 'normal' | 'small' = 'normal';
  @Input() isDisabled: boolean = false;
  @Input() isTextarea: boolean = true;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  handleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.valueChange.emit(inputElement.value);

    if (this.isTextarea && inputElement instanceof HTMLTextAreaElement) {
      this.adjustTextareaHeight(inputElement);
    }
  }

  private adjustTextareaHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';  
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  ngAfterViewChecked(): void {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      this.adjustTextareaHeight(textarea);
    }
  }
}
