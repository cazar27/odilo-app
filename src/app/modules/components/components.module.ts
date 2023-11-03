import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { SearchFormComponent } from 'src/app/components/search-form/search-form.component';

import { UserDetailComponent } from 'src/app/components/user-detail/user-detail.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from 'src/app/components/chart/chart.component';

@NgModule({
  declarations: [
    SearchFormComponent,
    UserListComponent,
    UserDetailComponent,
    LoaderComponent,
    ChartComponent,
    TruncatePipe
  ],
  exports: [
    SearchFormComponent,
    UserListComponent,
    UserDetailComponent,
    ChartComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
