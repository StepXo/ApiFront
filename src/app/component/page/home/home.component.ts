import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isDisabled: boolean = true; 

  buttons = [
    { label: PageConstants.CATEGORY_LABEL, size: EnumSize.Large, route: PageConstants.CATEGORY_ROUTE },
    { label: PageConstants.BRAND_LABEL, size: EnumSize.Large, route: PageConstants.BRAND_ROUTE },
    { label: PageConstants.ITEM_LABEL, size: EnumSize.Large, route: PageConstants.ITEM_ROUTE, isDisabled: this.isDisabled },
];

}
