import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AtomConstants } from 'src/app/shared/constant/stringConstants/atomConstants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Input() buttonName: string = AtomConstants.EMPTY; 
  @Input() link: string = AtomConstants.DEFAULT_LINK; 
  @Input() isDisabled: boolean = false; 


  constructor(private readonly router: Router) { }

  navigateToLink(): void {
    this.router.navigate([this.link]);
  }
}
