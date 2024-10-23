import { Component, Input } from '@angular/core';
import { FormField } from 'src/app/shared/models/formField';


@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss']
})
export class InputGroupComponent {
  @Input() fields: FormField[] = [];

}
