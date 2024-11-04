import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPipe } from './service/pipe/auth-pipe.pipe';



@NgModule({
  declarations: [
    AuthPipe,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthPipe
  ],
  exports:[
    AuthPipe
  ]
})
export class SharedModule { }
