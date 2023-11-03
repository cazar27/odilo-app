import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { UserDetailComponent } from '../components/user-detail/user-detail.component';
import { scoreControlGuard } from '../guards/score-control.guard';

const routes: Routes = [
  {
    path: 'list',
    component: HomeComponent,
  },
  {
    path: 'user/:login',
    component: UserDetailComponent,
    canActivate: [scoreControlGuard]
  },
  {
    path: '',
    redirectTo: 'home/list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home/list'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
