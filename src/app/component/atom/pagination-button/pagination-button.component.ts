import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent {

  @Input() label: string = 'Button';
  @Input() isActive: boolean = false;

}
