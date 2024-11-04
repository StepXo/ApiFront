import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRequiredRoutingModule } from './auth-required-routing.module';
import { AuthRequiredComponent } from './auth-required.component';
import { AtomModule } from '../../atom/atom.module';


@NgModule({
  declarations: [
    AuthRequiredComponent
  ],
  imports: [
    CommonModule,
    AuthRequiredRoutingModule,
    AtomModule
  ],
  exports:[
    AuthRequiredComponent
  ]
})
export class AuthRequiredModule { }
