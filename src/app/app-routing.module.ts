import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MainComponent } from './main/main.component';
import { InsertComentarioComponent } from './comentarios/insert-comentario/insert-comentario.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { LoginComponent } from './usuarios/login/login.component';
import { ListarEventosComponent } from './eventos/listar-eventos/listar-eventos.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: MainComponent },
  { path: "pruebas", component: PruebasComponent },
  { path: "comentar", component: InsertComentarioComponent },
  { path: "registrar", component: RegistrarComponent },
  { path: "login", component: LoginComponent },
  { path: "eventos", component: ListarEventosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
