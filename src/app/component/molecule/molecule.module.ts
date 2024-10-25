import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBurgerComponent } from './menu-burger/menu-burger.component';
import { AtomModule } from '../atom/atom.module';
import { InputGroupComponent } from './input-group/input-group.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    MenuBurgerComponent,
    InputGroupComponent,
    TableComponent,
    PaginationComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule,
    AtomModule,
    ReactiveFormsModule,
    NgSelectModule

  ],
  exports:[
    MenuBurgerComponent,
    InputGroupComponent,
    TableComponent,
    PaginationComponent,
    DropdownComponent
  ],

})
export class MoleculeModule { }
