import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnumSize } from 'src/app/shared/constant/enumSize';
import { OrganismConstants } from 'src/app/shared/constant/stringConstants/organismConstants';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

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
  size = EnumSize.Medium;
  button = EnumSize.Small
  isLoggedIn: boolean;

  constructor( 
    private readonly authService: AuthService,
    private readonly router: Router
   ) {
    this.isLoggedIn = !!this.authService.getToken();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/auth-required']);
  }
}
