import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculeModule } from '../molecule/molecule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomModule } from '../atom/atom.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';



@NgModule({
  declarations: [
    CategoryFormComponent,
    HeaderComponent,
    FooterComponent,
    CategoryTableComponent,
  ],
  imports: [
    CommonModule,
    AtomModule,
    MoleculeModule,
    ReactiveFormsModule,

  ],
  exports: [
    CategoryFormComponent,
    HeaderComponent,
    FooterComponent,
    CategoryTableComponent,
    ]
})
export class OrganismModule { }
