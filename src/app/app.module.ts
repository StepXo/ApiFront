import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './component/atom/button/button.component';
import { FormComponent } from './component/molecule/form/form.component';
import { HeaderComponent } from './component/organism/header/header.component';
import { FooterComponent } from './component/organism/footer/footer.component';
import { InputComponent } from './component/atom/input/input.component';
import { LogoComponent } from './component/atom/logo/logo.component';
import { MenuComponent } from './component/atom/menu/menu.component';
import { MenuBurgerComponent } from './component/molecule/menu-burger/menu-burger.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    InputComponent,
    LogoComponent,
    MenuComponent,
    MenuBurgerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
