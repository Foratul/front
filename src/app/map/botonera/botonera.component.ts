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


  datosGlobales = []
  distritos = []
  app
  map
  arrayItems
  clases
  iconoRadio = '<i class="fas fa-crosshairs"></i>'
  iconoBarrios = '<i class="fas fa-map-marked"></i>'
  iconoLimpiar = '<i class="fas fa-broom"></i>'
  iconoMarker = '<i class="fas fa-map-marker-alt"> </i>'
  arrayBotones
  radius = 500;






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

    this.app = this.appStateService.getAppState()
    this.map = this.app.map
    this.clases = ["btn btn-primary", "btn btn-secondary"]

    setTimeout(() => {
      console.log(this.arrayBotones = this.app.arrayBotones)
    }, 1)


    // for (const boton of this.arrayBotones) {
    //   boton.class = (boton.active) ? "enlace btn btn-primary" : "enlace btn btn-secondary"
    // }

    // ' <button title="Limpiar mapa" class="btn btn-secondary" (click)="limpiarMapa()">LIMPIAR MAPA</button>',
    // ' <button class="btn btn-secondary" (click)="limpiarRutas()">LIMPIAR RUTAS</button> ',
    // ' <button class="btn btn-secondary" (click)="toggleMarkers()">{{textomarkers}}</button> ',
    // '<button class="btn btn-secondary" (click)="toggleRadio()">ALTERNAR RADIO</button>',
    // '<button class="btn btn-secondary" (click)="modoRutas()" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Muestra u oculta rutas">MODO RUTA</button>',
    // ' <button class="btn btn-secondary"(click) = "toggleBarrios()" > {{ textobarrios }}</button>']




    //toda esta bazofia para que no se atasquen los tooltips


    this.datosBack.getBarrios()
      .then((result) => {
        result['data'].forEach(element => {
          if (!this.distritos.includes(element.distrito_nombre)) this.distritos.push(element.distrito_nombre)
        });
      })
      .catch((error) => { console.log(error) })

  }

  ngAfterViewInit() {

    $('a[data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'bottom',
      trigger: 'click'
    });

    $('a[data-toggle="tooltip"]').click(function (event) {
      event.stopPropagation();
    });

    $('body').click(function () {
      $('a[data-toggle="tooltip"]').tooltip('hide');
    });;
    jQuery("body").on("mouseleave", ".has-tooltip", function () {
      jQuery(this).blur();
    });
  }

  onSubmit(formulario) {
    //limpio MAPA
    this.markerService.removeMarkers(this.map)
    //ME TRAIGO LOS RESULTADOS FILTRADOS
    let datosfiltrados = this.filtrarService.filtrarPorCampo(this.datosGlobales, formulario.value.selector)
    //LOS DIBUJO
    this.markerService.addMarkers(this.map, datosfiltrados, this.map.radius);
  }

  onRadiusChange(radius) {

    if (radius == this.map.radius) return //si no ha habido cambio, no actualices

    $(".alert").addClass('activa')

    if (radius > 5000)

      this.map.radius = radius;
    // this.map.radius = radius


    this.appStateService.setCargando(true)
    if (this.map.mostrarMarkers) this.markerService.redibujarMarkers(this.map, radius)
    this.markerService.removeCircle(this.map)
    if (this.map.mostrarRadio) this.markerService.addCircle(this.map, this.map.position, this.map.radius)
    this.appStateService.setCargando(false)



  }

  limpiarMapa() {
    this.limpiarBarrios()
    this.limpiarRutas()
    this.limpiarMarkers()
    this.map.mostrarRadio = true; // para quitarlo
    this.arrayBotones[4].active = false
    // this.arrayBotones[4].class = this.clases[1]
    this.toggleRadio()
  }

  limpiarBarrios() {
    this.layerService.removeBarrios(this.map)
    this.map.mostrarBarrios = false
    this.arrayBotones[6].active = false
    // this.arrayBotones[6].class = this.clases[1]
  }

  toggleBarrios() {


    (this.map.mostrarBarrios) ? this.layerService.removeBarrios(this.map) : this.layerService.restoreBarrios(this.map)
    this.map.mostrarBarrios = !this.map.mostrarBarrios
  }

  limpiarRutas() { this.rutasService.limpiarRutas(this.map) }
  toggleMarkers() {
    (this.map.mostrarMarkers) ? this.markerService.removeMarkers(this.map) : this.markerService.addMarkers(this.map, null, this.map.radius)
    this.map.mostrarMarkers = !this.map.mostrarMarkers
  }
  limpiarMarkers() {

    this.map.mostrarMarkers = false
    this.markerService.removeMarkers(this.map)
    this.arrayBotones[3].active = false
    // this.arrayBotones[3].class = this.clases[1]
  }

  toggleRadio() {
    (this.map.mostrarRadio) ? this.markerService.removeCircle(this.map) : this.markerService.addCircle(this.map)
    this.map.mostrarRadio = !this.map.mostrarRadio;

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
    // if (!this.map && this.app.mapaIniciado) this.map = this.app.map;
    eval("this." + boton.funcion)

    // this.cambiarClaseABoton(boton)
    this.appStateService.actualizaBotonera()
    $('.botonero').tooltip('hide')


  }

  cambiarClaseABoton(boton) {
    if (boton.toggles) {
      boton.active = !boton.active
      // boton.class = (boton.active) ? "enlace btn btn-primary" : "enlace btn btn-secondary"
    }
  }

}




