import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './services/marker.service';
import { HttpClientModule } from '@angular/common/http';
import { PopUpService } from './services/pop-up.service';
import { FormsModule } from '@angular/forms'
import { MenuComponent } from './menu/menu.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';

import 'jquery'
import 'popper.js'
import 'bootstrap'
import 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-control-geocoder'
import 'leaflet.gridlayer.googlemutant';
import { PruebasComponent } from './pruebas/pruebas.component';
import { BotoneraComponent } from './map/botonera/botonera.component';
import { MainComponent } from './main/main.component';
import { InsertComentarioComponent } from './comentarios/insert-comentario/insert-comentario.component';
import { HeaderComponent } from './header/header.component';
import { RegistrarComponent } from './usuarios/registrar/registrar.component';
import { LoginComponent } from './usuarios/login/login.component';
import { ListarEventosComponent } from './eventos/listar-eventos/listar-eventos.component';
import { LogoutComponent } from './usuarios/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { VacioComponent } from './vacio/vacio.component';
import { GuardiaGuard } from './guardia.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './modal/modal.component';
import { ListarComentariosComponent } from './comentarios/listar-comentarios/listar-comentarios.component';
import { BuscadorComponent } from './buscador/buscador.component'
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleEventoComponent } from './eventos/detalle-evento/detalle-evento.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    PruebasComponent,
    BotoneraComponent,
    MainComponent,
    InsertComentarioComponent,
    HeaderComponent,
    RegistrarComponent,
    LoginComponent,
    ListarEventosComponent,
    LogoutComponent,
    HomeComponent,
    VacioComponent,
    ModalComponent,
    ListarComentariosComponent,
    BuscadorComponent,
    DetalleEventoComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule, DragDropModule,
    FontAwesomeModule, ReactiveFormsModule


  ],
  providers: [MarkerService, PopUpService, GuardiaGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  myFunction = function () { alert("hola") }

}
