import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MarkerService } from './marker.service';
import { HttpClientModule } from '@angular/common/http';
import { PopUpService } from './pop-up.service';
import { FormsModule } from '@angular/forms'
import { MenuComponent } from './menu/menu.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { LoginComponent } from './usuarios/login/login.component'



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
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule


  ],
  providers: [MarkerService, PopUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
