import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBurgerComponent } from './menu-burger/menu-burger.component';
import { AtomModule } from '../atom/atom.module';
import { InputGroupComponent } from './input-group/input-group.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    MenuBurgerComponent,
    InputGroupComponent,
    TableComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    AtomModule
  ],
  exports:[
    MenuBurgerComponent,
    InputGroupComponent,
    TableComponent,
    PaginationComponent
  ]
})
export class MoleculeModule { }
