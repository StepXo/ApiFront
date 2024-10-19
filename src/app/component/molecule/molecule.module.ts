import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { MenuBurgerComponent } from './menu-burger/menu-burger.component';
import { AtomModule } from '../atom/atom.module';



@NgModule({
  declarations: [
    FormComponent,
    MenuBurgerComponent
  ],
  imports: [
    CommonModule,
    AtomModule
  ],
  exports:[
    FormComponent,
    MenuBurgerComponent
  ]
})
export class MoleculeModule { }
