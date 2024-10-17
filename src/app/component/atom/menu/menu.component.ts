import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() buttonName: string = 'Menu Button'; 
  @Input() link: string = '/'; 
  @Input() isDisabled: boolean = false; 


  constructor(private router: Router) { }

  navigateToLink(): void {
    this.router.navigate([this.link]);
  }
}
