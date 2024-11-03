import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { DesignSystemModule } from '../../design-system.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DesignSystemModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
