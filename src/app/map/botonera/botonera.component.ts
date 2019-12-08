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
  textobarrios = "OCULTAR BARRIOS"
  textomarkers = "OCULTAR MARKERS"
  datosGlobales = []
  distritos = []
  markers = true
  barrios = true
  radius = 1000
  radio = true
  arrayItems
  arrayBotones = []




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

    this.arrayBotones = [
      { funcion: "toggleCargando()", texto: "Toggle Cargando", tooltip: "alternaCarga" },
      { funcion: "limpiarMapa()", texto: "Limpiar Mapa", tooltip: "limpia el mapa" },
      { funcion: "limpiarRutas()", texto: "Limpiar Rutas", tooltip: "limpia rutas" },
      { funcion: "toggleMarkers()", texto: "Alternar Markers", tooltip: "alternar markers" },
      { funcion: "toggleRadio()", texto: "Alternar Radio", tooltip: "alternar radio" },
      { funcion: "modoRutas()", texto: "Modo Rutas", tooltip: "modo rutas" },

      { funcion: "toggleBarrios()", texto: "Alternar Barrios", tooltip: "alternar barrios" }]
    for (const boton of this.arrayBotones) {
      boton.class = "btn btn-secondary"
    }

    // ' <button title="Limpiar mapa" class="btn btn-secondary" (click)="limpiarMapa()">LIMPIAR MAPA</button>',
    // ' <button class="btn btn-secondary" (click)="limpiarRutas()">LIMPIAR RUTAS</button> ',
    // ' <button class="btn btn-secondary" (click)="toggleMarkers()">{{textomarkers}}</button> ',
    // '<button class="btn btn-secondary" (click)="toggleRadio()">ALTERNAR RADIO</button>',
    // '<button class="btn btn-secondary" (click)="modoRutas()" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Muestra u oculta rutas">MODO RUTA</button>',
    // ' <button class="btn btn-secondary"(click) = "toggleBarrios()" > {{ textobarrios }}</button>']


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
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
    this.toggleRadio()
  }

  limpiarBarrios() {
    this.layerService.removeBarrios(this.map)
    this.map.barrios = false
    this.textobarrios = "OCULTAR BARRIOS"
  }

  toggleBarrios() {
    (this.map.barrios) ? this.layerService.removeBarrios(this.map) : this.layerService.restoreBarrios(this.map)
    this.textobarrios = (this.map.barrios) ? "MOSTRAR BARRIOS" : "OCULTAR BARRIOS"
    this.map.barrios = !this.map.barrios
  }

  limpiarRutas() { this.rutasService.limpiarRutas(this.map) }
  toggleMarkers() {
    (this.map.markers) ? this.markerService.removeMarkers(this.map) : this.markerService.addMarkers(this.map, null, this.radius)
    this.textomarkers = (this.map.markers) ? "MOSTRAR MARKERS" : "OCULTAR MARKERS"
    this.map.markers = !this.map.markers
  }
  limpiarMarkers() {

    this.textomarkers = "MOSTRAR MARKERS"
    this.map.markers = false
    this.markerService.removeMarkers(this.map)
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
    boton.class = "btn btn-primary"
    // eval("this." + boton.funcion)
    console.log(window)
    BotoneraComponent[boton.funcion]

  }

}




