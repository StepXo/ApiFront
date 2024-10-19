import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MoleculeModule } from '../molecule/molecule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomModule } from '../atom/atom.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    CategoryFormComponent,
    HeaderComponent,
    FooterComponent
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
    FooterComponent
    ]
})
export class OrganismModule { }
