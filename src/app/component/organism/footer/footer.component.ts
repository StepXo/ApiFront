import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  size: EnumSize = EnumSize.Large
  
  contactInfo = [
    { label: OrganismConstants.EMAIL_LABEL,
      value: OrganismConstants.EMAIL },
    { label: OrganismConstants.PHONE_LABEL, 
      value: OrganismConstants.PHONE },
    { label: OrganismConstants.ADDRESS_LABEL, 
      value: OrganismConstants.ADDRESS }
  ];

  constructor() { }

}
