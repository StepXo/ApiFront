import { NgModule } from '@angular/core';
import { AtomModule } from './atom/atom.module';
import { MoleculeModule } from './molecule/molecule.module';
import { OrganismModule } from './organism/organism.module';



@NgModule({
  declarations: [],
  imports: [
    AtomModule,
    MoleculeModule,
    OrganismModule
  ],
  exports: [
    AtomModule,
    MoleculeModule,
    OrganismModule
  ]
})
export class DesignSistemModule { }
