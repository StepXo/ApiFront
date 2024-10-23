import { Component, Input  } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  src: string = AtomConstants.SRC; 
  @Input() alt: string = AtomConstants.EMPTY; 
  @Input() size: EnumSize = EnumSize.Medium; 

}
