import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { DesignSistemModule } from '../../design-sistem.module';
import { CategoryComponent } from './category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    DesignSistemModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class CategoryModule { }
