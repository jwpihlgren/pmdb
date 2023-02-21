import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchGridComponent } from './components/search-grid/search-grid.component';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    SearchGridComponent,
    ButtonGroupComponent,
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
