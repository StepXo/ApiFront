import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems = [
    { name: 'Inicio', link: '/home' },
    { name: 'Categorias', link: '/category' },
    { name: 'Marcas', link: '/brand' },
    { name: 'Articulos', link: '/Item' },
  ];
}
