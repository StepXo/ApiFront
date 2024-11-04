import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyRoutingModule } from './supply-routing.module';
import { SupplyComponent } from './supply.component';
import { DesignSystemModule } from '../../design-system.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SupplyComponent
  ],
  imports: [
    CommonModule,
    SupplyRoutingModule,
    DesignSystemModule,
    SharedModule
  ],
  exports:[
    SupplyComponent
  ]
})
export class SupplyModule { }
