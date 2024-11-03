import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { PageConstants } from 'src/app/shared/constant/stringConstants/pageConstants';
import { ButtonConfig } from 'src/app/shared/models/buttonConfig';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  buttons: ButtonConfig[] = [
    { label: PageConstants.CATEGORY_LABEL, size: EnumSize.Large, route: PageConstants.CATEGORY_ROUTE },
    { label: PageConstants.BRAND_LABEL, size: EnumSize.Large, route: PageConstants.BRAND_ROUTE },
    { label: PageConstants.ITEM_LABEL, size: EnumSize.Large, route: PageConstants.ITEM_ROUTE }
  ];

  isAdmin = false;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.checkAdminRole();
  }

  private checkAdminRole(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'ROLE_ADMIN';

    if (this.isAdmin) {
      this.buttons.push({
        label: PageConstants.CLIENT_LABEL,
        size: EnumSize.Large,
        route: PageConstants.CLIENT_ROUTE
      });
    }
  }
}
