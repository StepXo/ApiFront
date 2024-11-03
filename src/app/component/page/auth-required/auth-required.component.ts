import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-auth-required',
  templateUrl: './auth-required.component.html',
  styleUrls: ['./auth-required.component.scss']
})
export class AuthRequiredComponent {
  largeSize = EnumSize.Large;
  smallSize = EnumSize.Small;
}
