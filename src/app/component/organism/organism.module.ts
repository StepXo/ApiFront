import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculeModule } from '../molecule/molecule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomModule } from '../atom/atom.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { FullTableComponent } from './full-table/full-table.component';



@NgModule({
  declarations: [
    FormComponent,
    HeaderComponent,
    FooterComponent,
    FullTableComponent,
  ],
  imports: [
    CommonModule,
    AtomModule,
    MoleculeModule,
    ReactiveFormsModule,

  ],
  exports: [
    FormComponent,
    HeaderComponent,
    FooterComponent,
    FullTableComponent,
    ]
})
export class OrganismModule { }
