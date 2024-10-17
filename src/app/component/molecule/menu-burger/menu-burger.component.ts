import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-burger',
  templateUrl: './menu-burger.component.html',
  styleUrls: ['./menu-burger.component.scss']
})
export class MenuBurgerComponent implements OnInit {
  menuVisible: boolean = false;
  @Input() menuItems: { name: string, link: string, isDisabled?: boolean }[] = [];
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menuItems.forEach(item => {
      if (item.isDisabled === undefined) {
        item.isDisabled = false;
      }
    });
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateToLink(link: string): void {
    if (link) {
      this.router.navigate([link]);
    }
  }
}
