import { Component } from '@angular/core';
import { EnumSize } from 'src/app/shared/constant/enumSize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isDisabled: boolean = true; 

  buttons = [
    { label: 'Categorias', size: EnumSize.Large, route: '/category' },
    { label: 'Marcas', size: EnumSize.Large, route: '/brand', isDisabled: this.isDisabled },
    { label: 'Articulos', size: EnumSize.Large, route: '/item', isDisabled: this.isDisabled },

  ];

}
