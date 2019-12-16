import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'

})

export class AppStateService {

  app = { cargando: false, menu_desplegado: false, logueado: false, user: { username: null, ID: null }, developerMode: false, historial: [], mostrarMapa: false, mostrarAplicacion: true, extenderHeader: false, modal: false, paginaDesplegable: "HOME", arrayComentarios: null, map: null, eventosCercanos: true, paginaMain: "HOME", mapZero: "mapZero", mapID: "mapZero", mapaIniciado: false }

  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {


  }


  getAppState() {
    return this.app
  }

  setAppState(app) {
    this.app = app;
  }
  setCargando(p) {
    let self = this
    setTimeout(() => {
      self.app.cargando = p
    }, 1) //problemas con las vistas again

  }
  getCargando() { return this.app.cargando }

  toggleCargando() {


    let self = this
    setTimeout(() => {
      self.app.cargando = !self.app.cargando
    }, 1)
    console.log("app.cargando vale:", this.app.cargando)

  }
  setLogueado(p) {
    this.app.logueado = p
  }

  getLogueado() { return this.app.logueado }

  setUser(u) {
    this.app.user = u;
  }

  getUser() {
    return this.app.user;
  }

  segPaginaMain(p) { this.app.paginaMain = p }
  getPaginaMain() { return this.app.paginaMain }






  setDeveloperMode(p) {
    this.app.developerMode = p;
  }

  getDeveloperMode() {
    return this.app.developerMode;
  }

  setHistorial(p) {
    this.app.historial.push(p)
  }
  getHistorial() { return this.app.historial[this.app.historial.length - 2] }

  getMostrarMapa() { return this.app.mostrarMapa }
  setMostrarMapa(s) {
    console.log("han llamado a mostrarMapa", s)
    let self = this
    setTimeout(() => { self.app.mostrarMapa = s }, 1) // esta hecho asi para evitar "expression has changed after it was checked" , regula directivas estructurales y no funcionaba en ninguna parte del ciclo de vida de los  xInit
  }
  getMostrarAplicacion() { return this.app.mostrarAplicacion }
  setMostrarAplicacion(p) { this.app.mostrarAplicacion = p; }

  setExtenderHeader(p) { this.app.extenderHeader = p }
  getExtenderHeader() { return this.app.extenderHeader }

  setModal(p) { this.app.modal = p }
  getModal() { return this.app.modal }

  setPaginaDesplegable(p) { this.app.paginaDesplegable = p }
  getPaginaDesplegable() { return this.app.paginaDesplegable }

  setMapaIniciado(p) { this.app.mapaIniciado = p }
  getMapaIniciado(p) { return this.app.mapaIniciado; }


}


