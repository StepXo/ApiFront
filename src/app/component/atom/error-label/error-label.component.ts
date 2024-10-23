import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-label',
  templateUrl: './error-label.component.html',
  styleUrls: ['./error-label.component.scss']
})
export class ErrorLabelComponent {
  @Input() message: string | null = null
}
