import { HomeComponent } from './components/home/home.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '' , component: HomeComponent },
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: '*', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
