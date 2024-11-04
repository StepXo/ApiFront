import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignSystemModule } from '../../design-system.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ReactiveFormsModule,
    DesignSystemModule,
    SharedModule
  ],
  exports:[
    RoleComponent
  ]
})
export class RoleModule { }
