import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./modules/pages/pages.module').then( m => m.PagesModule ),
  },
  {
    path: '',
    redirectTo: '/home/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home/list'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
