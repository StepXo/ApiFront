import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationsComponent } from './utils/validations/validations.component';

@NgModule({
  declarations: [
    ValidationsComponent,    
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidationsComponent
  ]
})
export class SharedModule { }
