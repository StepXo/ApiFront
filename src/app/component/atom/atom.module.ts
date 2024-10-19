import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorLabelComponent } from './error-label/error-label.component';



@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    LogoComponent,
    MenuComponent,
    ErrorLabelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    ButtonComponent,
    InputComponent,
    LogoComponent,
    MenuComponent,
    ErrorLabelComponent
  ]
})
export class AtomModule { }
