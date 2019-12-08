import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'

})

export class AppStateService {

  app = { cargando: false, menu_desplegado: false, logueado: false }

  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {

  }

  getAppState() {
    return this.app
  }

  setAppState(app) {
    this.app = app;
  }
  setCargando(p) {
    this.app.cargando = p
  }
  getCargando() { return this.app.cargando }

  toggleCargando() {


    this.app.cargando = !this.app.cargando

  }
  setLogueado(p) {
    this.app.cargando = p
  }

  getLogueado() { return this.app.logueado }







}
