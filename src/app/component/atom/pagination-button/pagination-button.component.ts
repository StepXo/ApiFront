import { Component, Input } from '@angular/core';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-pagination-button',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.scss']
})
export class PaginationButtonComponent {

  @Input() label: string = AtomConstants.EMPTY;
  @Input() isActive: boolean = false;

}
