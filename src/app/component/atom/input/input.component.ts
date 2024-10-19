import { Component, Input,  ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string = '';
  @Input() isDisabled: boolean = false;
  @Input() size: 'normal' | 'small' = 'normal';

  @ViewChild('textareaElement') textarea!: ElementRef;

  adjustTextareaHeight(event: Event): void {

    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

}

