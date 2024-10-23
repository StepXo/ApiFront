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
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
