import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { DesignSystemModule } from '../../design-system.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    DesignSystemModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    RegisterComponent
  ]
})
export class RegisterModule { }
