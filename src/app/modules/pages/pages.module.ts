import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '../../routes/home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from 'src/app/pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }
