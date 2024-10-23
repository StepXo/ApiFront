import { Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = AtomConstants.EMPTY;
  @Input() isDisabled: boolean = false;
  @Input() size: EnumSize = EnumSize.Medium;

  @ViewChild(AtomConstants.TEXT_AREA) textarea!: ElementRef;

  adjustTextareaHeight(event: Event): void {

    const textarea = event.target as HTMLTextAreaElement;

    textarea.style.height = AtomConstants.HEIGHT;
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
