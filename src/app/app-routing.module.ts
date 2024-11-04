import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home',
    loadChildren:() => import('./component/page/home/home.module').then(x=>x.HomeModule)
  },
  {path: 'category',
    loadChildren:() => import('./component/page/category/category.module').then(x=>x.CategoryModule)
  },
  {path: 'brand',
    loadChildren:() => import('./component/page/brand/brand.module').then(x=>x.BrandModule)
  },
  {path: 'item',
    loadChildren:() => import('./component/page/item/item.module').then(x=>x.ItemModule)
  },
  {path: 'login',
    loadChildren:() => import('./component/page/login/login.module').then(x=>x.LoginModule)
  },
  {path: 'register',
    loadChildren:() => import('./component/page/register/register.module').then(x=>x.RegisterModule)
  },
  { path: 'auth-required', 
    loadChildren: () => import('./component/page/auth-required/auth-required.module').then(x => x.AuthRequiredModule) 
  },
  { path: 'role', 
    loadChildren: () => import('./component/page/role/role.module').then(x => x.RoleModule) 
  },
  { path: '**', 
    loadChildren:() => import('./component/page/not-found/not-found.module').then(x=>x.NotFoundModule) 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
