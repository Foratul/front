import { Component, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { MarkerService } from 'src/app/marker.service';
import { LayerService } from 'src/app/layer.service';
import { PeticionesDatosService } from 'src/app/peticiones-datos.service';
import { FiltrarService } from 'src/app/filtrar.service';
import { RutasService } from 'src/app/rutas.service';
import 'popper.js'
declare let $
import 'bootstrap'
import { resolve } from 'url';
import { AppStateService } from 'src/app/appstate.service';

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




  constructor(
    private markerService: MarkerService,
    private layerService: LayerService,
    private peticionesDatosService: PeticionesDatosService,
    private filtrarService: FiltrarService,
    private rutasService: RutasService,
    private appStateService: AppStateService
    // private myElement: ElementRef
  ) {

  }
  ngOnInit() {


    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })



    this.peticionesDatosService.getBarrios()
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



}



