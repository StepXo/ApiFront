import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
import { DesignSystemModule } from '../../design-system.module';


@NgModule({
  declarations: [
    BrandComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    DesignSystemModule
  ],
  exports:[
    BrandComponent
  ]
})
export class BrandModule { }
