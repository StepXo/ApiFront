import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() options: { value: string | number, label: string }[] = [];
  @Input() selectedValue: string | number | null = null;
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string | number>();

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.valueChange.emit(target.value);
  }
}