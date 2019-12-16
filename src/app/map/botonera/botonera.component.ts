import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import { LayerService } from 'src/app/services/layer.service';
import { FiltrarService } from 'src/app/services/filtrar.service';
import { RutasService } from 'src/app/services/rutas.service';
import 'popper.js'
declare let $
import 'bootstrap'
import { AppStateService } from 'src/app/services/appstate.service';
import { datosBackService } from 'src/app/services/datosBack.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})


export class BotoneraComponent implements OnInit, AfterViewInit {

  @Input() map

  datosGlobales = []
  distritos = []
  markers = true
  barrios = true
  radius = 500
  radio = true
  arrayItems
  clases
  arrayBotones = []
  iconoMarker = '<i class="fas fa-map-marker-alt"> </i>'
  iconoRadio = '<i class="fas fa-crosshairs"></i>'
  iconoBarrios = '<i class="fas fa-map-marked"></i>'
  iconoLimpiar = '<i class="fas fa-broom"></i>'




  constructor(
    private markerService: MarkerService,
    private layerService: LayerService,
    private datosBack: datosBackService,
    private filtrarService: FiltrarService,
    private rutasService: RutasService,
    private appStateService: AppStateService
    // private myElement: ElementRef
  ) {

  }


  ngOnInit() {
    this.clases = ["btn btn-primary", "btn btn-secondary"]

    this.arrayBotones = [
      { funcion: "toggleCargando()", texto: "Toggle Cargando", tooltip: "alternaCarga", tooltipPos: "top", toggles: true, active: false },
      { funcion: "limpiarMapa()", texto: this.iconoLimpiar, tooltip: "limpia el mapa", tooltipPos: "top", toggles: false, active: false },
      { funcion: "limpiarRutas()", texto: "Limpiar Rutas", tooltip: "limpia rutas", tooltipPos: "top", toggles: false, active: false },
      { funcion: "toggleMarkers()", texto: this.iconoMarker, tooltip: "muestra u oculta marcadores", tooltipPos: "top", toggles: true, active: true },
      { funcion: "toggleRadio()", texto: this.iconoRadio, tooltip: "alternar radio", tooltipPos: "top", toggles: true, active: true },
      { funcion: "modoRutas()", texto: "Modo Rutas", tooltip: "modo rutas", tooltipPos: "top", toggles: true, active: false },
      { funcion: "toggleBarrios()", texto: this.iconoBarrios, tooltip: "muestra u oculta distritos", tooltipPos: "top", toggles: true, active: true }]
    for (const boton of this.arrayBotones) {
      boton.class = (boton.active) ? "btn btn-primary" : "btn btn-secondary"
    }

    // ' <button title="Limpiar mapa" class="btn btn-secondary" (click)="limpiarMapa()">LIMPIAR MAPA</button>',
    // ' <button class="btn btn-secondary" (click)="limpiarRutas()">LIMPIAR RUTAS</button> ',
    // ' <button class="btn btn-secondary" (click)="toggleMarkers()">{{textomarkers}}</button> ',
    // '<button class="btn btn-secondary" (click)="toggleRadio()">ALTERNAR RADIO</button>',
    // '<button class="btn btn-secondary" (click)="modoRutas()" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Muestra u oculta rutas">MODO RUTA</button>',
    // ' <button class="btn btn-secondary"(click) = "toggleBarrios()" > {{ textobarrios }}</button>']


    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      })
    })





    this.datosBack.getBarrios()
      .then((result) => {
        result['data'].forEach(element => {
          if (!this.distritos.includes(element.distrito_nombre)) this.distritos.push(element.distrito_nombre)
        });
      })
      .catch((error) => { console.log(error) })

  }

  ngAfterViewInit() {

    // $(function () {
    //   $('[data-toggle="tooltip"]').tooltip()
    // })
  }

  onSubmit(formulario) {
    //limpio MAPA
    this.markerService.removeMarkers(this.map)
    //ME TRAIGO LOS RESULTADOS FILTRADOS
    let datosfiltrados = this.filtrarService.filtrarPorCampo(this.datosGlobales, formulario.value.selector)
    //LOS DIBUJO
    this.markerService.addMarkers(this.map, datosfiltrados, this.radius);
  }

  onRadiusChange(radius) {

    if (radius == this.radius) return //si no ha habido cambio, no actualices

    console.log("moviendoSlider a : ", radius)
    this.radius = radius;
    this.map.radius = radius


    this.appStateService.setCargando(true)
    this.markerService.redibujarMarkers(this.map, radius)
    this.markerService.removeCircle(this.map)
    this.markerService.addCircle(this.map, this.map.position, this.map.radius)
    this.appStateService.setCargando(false)



  }

  limpiarMapa() {
    this.limpiarBarrios()
    this.limpiarRutas()
    this.limpiarMarkers()
    this.map.radio = true; // para quitarlo
    this.arrayBotones[4].active = false
    this.arrayBotones[4].class = this.clases[1]
    this.toggleRadio()
  }

  limpiarBarrios() {
    this.layerService.removeBarrios(this.map)
    this.map.barrios = false
    this.arrayBotones[6].active = false
    this.arrayBotones[6].class = this.clases[1]
  }

  toggleBarrios() {
    (this.map.barrios) ? this.layerService.removeBarrios(this.map) : this.layerService.restoreBarrios(this.map)
    this.map.barrios = !this.map.barrios
  }

  limpiarRutas() { this.rutasService.limpiarRutas(this.map) }
  toggleMarkers() {
    (this.map.markers) ? this.markerService.removeMarkers(this.map) : this.markerService.addMarkers(this.map, null, this.radius)
    this.map.markers = !this.map.markers
  }
  limpiarMarkers() {

    this.map.markers = false
    this.markerService.removeMarkers(this.map)
    this.arrayBotones[3].active = false
    this.arrayBotones[3].class = this.clases[1]
  }

  toggleRadio() {
    (this.map.radio) ? this.markerService.removeCircle(this.map) : this.markerService.addCircle(this.map)

  }


  modoRutas() {
    // enrutando desactiva el barrios hightlith

    this.map.enrutando = !this.map.enrutando
  }


  toggleCargando() {
    this.appStateService.toggleCargando()

  }
  drop($event) { moveItemInArray(this.arrayBotones, $event.previousIndex, $event.currentIndex); }

  botonPresionado(boton) {
    eval("this." + boton.funcion)
    this.cambiarClaseABoton(boton)

  }

  cambiarClaseABoton(boton) {
    if (boton.toggles) {
      boton.active = !boton.active
      boton.class = (boton.active) ? "btn btn-primary" : "btn btn-secondary"
    }
  }

}




