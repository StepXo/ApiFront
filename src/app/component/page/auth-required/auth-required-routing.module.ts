import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRequiredComponent } from './auth-required.component';

const routes: Routes = [
  { path: '', component: AuthRequiredComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRequiredRoutingModule { }
