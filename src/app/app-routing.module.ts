import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebasComponent } from './pruebas/pruebas.component';
import { MainComponent } from './main/main.component';
import { InsertComentarioComponent } from './comentarios/insert-comentario/insert-comentario.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { LoginComponent } from './usuarios/login/login.component';
import { MapComponent } from './map/map.component';
import { LogoutComponent } from './usuarios/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { VacioComponent } from './vacio/vacio.component';
import { GuardiaGuard } from './guardia.guard';
import { ListarComentariosComponent } from './comentarios/listar-comentarios/listar-comentarios.component';
import { ListarEventosComponent } from './eventos/listar-eventos/listar-eventos.component';
import { BuscadorComponent } from './buscador/buscador.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "pruebas", component: PruebasComponent, canActivate: [GuardiaGuard] },
  { path: "comentar", component: InsertComentarioComponent, canActivate: [GuardiaGuard], canLoad: [GuardiaGuard] },
  { path: "comentar/:idEvento", component: InsertComentarioComponent, canActivate: [GuardiaGuard] },
  { path: "registrar", component: RegistrarComponent, canActivate: [GuardiaGuard] },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent, canActivate: [GuardiaGuard] },
  { path: "eventos", component: ListarEventosComponent, canActivate: [GuardiaGuard] },
  { path: "mapa", component: VacioComponent, canActivate: [GuardiaGuard] },
  { path: "listarComentarios", component: ListarComentariosComponent, canActivate: [GuardiaGuard] },
  { path: "buscador", component: BuscadorComponent, canActivate: [GuardiaGuard] },
  { path: "vacio", component: VacioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
