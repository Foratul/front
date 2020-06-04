import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'

})

export class AppStateService {

  iconoRadio = '<i class="fas fa-crosshairs"></i>'
  iconoBarrios = '<i class="fas fa-map-marked"></i>'
  iconoLimpiar = '<i class="fas fa-broom"></i>'
  iconoMarker = '<i class="fas fa-map-marker-alt"> </i>'
  iconoMotor = '<i class="fas fa-layer-group"></i>'

  app = {
    cargando: false, menu_desplegado: false, logueado: false, user: { username: null, ID: null }, developerMode: false, historial: [], mostrarMapa: false, mostrarAplicacion: true, extenderHeader: false, modal: {}, paginaDesplegable: "HOME", paginaPrevia: "MENU", arrayComentarios: null, map: null, eventosCercanos: true, paginaMain: "HOME", mapZero: "mapZero", mapID: "mapZero", mapaIniciado: false, arrayBotones: [],
    comentarioExitoso: new Subject<boolean>(),
    comentarioExitoso$: null, localhost: true
  }



  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {
    this.app.comentarioExitoso$ = this.app.comentarioExitoso.asObservable()
    console.log(this.app)

  }
  setComentarioExitoso(boolean) { this.app.comentarioExitoso.next(boolean) }

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
  setMostrarMapa(showMap : boolean) {
    console.log("han llamado a mostrarMapa", showMap)
    let self = this
    setTimeout(() => { self.app.mostrarMapa = showMap }, 1) // esta hecho asi para evitar "expression has changed after it was checked" , regula directivas estructurales y no funcionaba en ninguna parte del ciclo de vida de los  xInit
  }
  getMostrarAplicacion() { return this.app.mostrarAplicacion }
  setMostrarAplicacion(p) { this.app.mostrarAplicacion = p; }

  setExtenderHeader(p) { this.app.extenderHeader = p }
  getExtenderHeader() { return this.app.extenderHeader }

  setModal(p) { this.app.modal = p }
  getModal() { return this.app.modal }

  setPaginaDesplegable(p) { this.app.paginaDesplegable = p }
  getPaginaDesplegable() { return this.app.paginaDesplegable }

  setMap(map) {
    this.app.map = map
    console.log("han llamado a setMap() , devuelvo : ", this.app.map)
    setTimeout(() => {
      this.actualizaBotonera(map)

    }, 1)

  }
  getMap() {

    console.log("han llamado a getMap() , devuelvo : ", this.app.map)
    return this.app.map
  }

  setMapaIniciado(p) { this.app.mapaIniciado = p }
  getMapaIniciado(p) { return this.app.mapaIniciado; }

  actualizaBotonera(map = this.app.map) {
    this.app.arrayBotones = [
      { funcion: "toggleCargando()", texto: '<div class="inbisible spinner-border" role="status"></div>', tooltip: "alternaCarga", tooltipPos: "right", toggles: true, active: false },
      { funcion: "limpiarMapa()", texto: this.iconoLimpiar, tooltip: "limpia el mapa", tooltipPos: "right", toggles: false, active: false, show: true },
      { funcion: "limpiarRutas()", texto: "Limpiar Rutas", tooltip: "limpia rutas", tooltipPos: "right", toggles: false, active: false },
      { funcion: "toggleMarkers()", texto: this.iconoMarker, tooltip: "muestra u oculta marcadores", tooltipPos: "right", toggles: true, active: map.mostrarMarkers, show: true },
      { funcion: "toggleRadio()", texto: this.iconoRadio, tooltip: "alternar radio", tooltipPos: "right", toggles: true, active: map.mostrarRadio, show: true },
      { funcion: "modoRutas()", texto: "Modo Rutas", tooltip: "modo rutas", tooltipPos: "right", toggles: true, active: false },
      { funcion: "toggleBarrios()", texto: this.iconoBarrios, tooltip: "muestra u oculta distritos", tooltipPos: "right", toggles: true, active: map.mostrarBarrios, show: true }
      , { funcion: "toggleMotor()", texto: this.iconoMotor, tooltip: "cambia motor de Mapas", tooltipPos: "right", toggles: true, active: true, show: true }]
  }

}


