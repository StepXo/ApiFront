import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems = [
    { name: OrganismConstants.HOME, link: OrganismConstants.HOME_PATH },
    { name: OrganismConstants.CATEGORY, link: OrganismConstants.CATEGORY_PATH },
    { name: OrganismConstants.BRAND, link: OrganismConstants.BRAND_PATH },
    { name: OrganismConstants.ITEM, link: OrganismConstants.ITEM_PATH },
];
  size = EnumSize.Medium


}
