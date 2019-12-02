import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: MainComponent },
  { path: "pruebas", component: PruebasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
