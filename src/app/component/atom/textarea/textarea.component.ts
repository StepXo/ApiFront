import { Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;
  @Input() size: EnumSize = EnumSize.Medium;

  @ViewChild('textareaElement') textarea!: ElementRef;

  adjustTextareaHeight(event: Event): void {

    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
