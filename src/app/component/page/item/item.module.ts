import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemRoutingModule } from './item-routing.module';
import { DesignSystemModule } from '../../design-system.module';
import { ItemComponent } from './item.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    DesignSystemModule,
    ReactiveFormsModule
  ],
  exports:[
    ItemComponent
  ]
})
export class ItemModule { }
