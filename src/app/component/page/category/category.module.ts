import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { DesignSystemModule } from '../../design-system.module';
import { CategoryComponent } from './category.component';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    DesignSystemModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class CategoryModule { }
