

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FiltrarService } from '../services/filtrar.service';
import { LayerService } from '../services/layer.service';
import { RutasService } from '../services/rutas.service';
// import 'leaflet-control-geocoder'
import { AppStateService } from '../services/appstate.service';
import { MarkerService } from '../services/marker.service';
import { datosBackService } from '../services/datosBack.service';
import { EventosService } from '../services/eventos.service';
import { PopUpService } from '../services/pop-up.service';
declare let funcionesComunes

declare let L

declare let Routing
declare let $
// import 'lrm-graphhopper'



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  map
  @Input() mapID
  app
  geoCapable: boolean = false
  datosGlobales: any
  distritos = []
  arrayEventos = []
  mapaIniciado = false
  nombreMenu
  posicionNueva
  mostrarMenuDesplegable = false
  tilesActual


  constructor(
    private markerService: MarkerService,
    private layerService: LayerService,
    private datosBack: datosBackService,
    private filtrarService: FiltrarService,
    private eventosService: EventosService,
    private rutasService: RutasService
    , private appStateService: AppStateService,
    private popUpService: PopUpService) { }

  ngOnInit() {



    this.appStateService.setCargando(true)
    this.app = this.appStateService.getAppState()
    // this.mapID = this.app.mapID;
    this.appStateService.setHistorial('/map')
    this.arrayEventos = this.eventosService.getEventosSeleccionados()
    // if (this.app.mapaIniciado) {

    // alert("creo hijo DOM")
    // this.mapaIniciado = true
    // var eElement = document.getElementsByClassName("map-frame")[0]
    // var newFirstElement = document.createElement("div")
    // newFirstElement.setAttribute("id", "mapObjeto")
    // eElement.insertBefore(newFirstElement, eElement.firstChild);

    // // }

    // alert("this.app.mapaIniciado vale " + this.app.mapaIniciado)
    // alert("MAPA INCIADO VALE " + this.mapaIniciado)

    this.appStateService.setMapaIniciado(true)
  }

  async ngAfterViewInit() {
    $('.dropdown').on('show.bs.dropdown', function () {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function () {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
    });





    // setTimeout(() => {
    //   this.initMap({ coords: { latitude: 40.458121, longitude: -3.700676 } })


    // }, 10)


    this.getPosition()
      .then((position) => {

        this.geoCapable = true
        // position = { coords: { latitude: 40.458121, longitude: -3.700676 } }
        //para empezar en TETUAN
        setInterval(() => {
          this.getPosition().then((position) => {
            this.map.myPosition = {
              coords: { latitude: position.coords.latitude, longitude: position.coords.longitude }
            }
            console.log("updating POSITION")
            this.markerService.removeCircle
            this.markerService.addMarkerOnMyLocation(this.map)
          })
        }, 60 * 60 * 1000) //tiempo de update
        this.initMap(position)
      })
      .catch((error) => {
        this.geoCapable = false

        alert("this Getposition catch" + error.mensaje)
        console.log(error)
        this.initMap(
          { coords: { latitude: 40.458121, longitude: -3.700676 } }
        )
      })

  }
  getPosition(): Promise<any> {

    let prom = new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject({ mensaje: "GEOLOCALIZACION NO FUNCIONA" })
      else {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position)
          reject({ mensaje: "ERROR, este dispositivo no permite GEOLOCALIZAR; SE USARÁ UNA POSICION POR DEFECTO", debug: "promesa de geolocation rechazada" })
        })
      }
    })
    return prom;
  }

  async initMap(position) {

    // mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazI5YnFtNWIyaHcxM2lucnd5ZTJuZWd3In0._XB0qU2AeBff9ThO003CFw';
    // var map = new mapboxgl.Map({
    //   container: 'YOUR_CONTAINER_ELEMENT_ID',
    //   style: 'mapbox://styles/mapbox/streets-v11'
    // });
    // alert("creada instancia de mapa + voy a meterla en ID " + this.mapID)



    this.map = new L.map(this.mapID, {
      center: [position.coords.latitude, position.coords.longitude],
      zoom: 15,
      // minZoom: 10

    })

    this.map.myPosition = { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } }
    // this.map.radius = 1000
    // this.map.barrios = true
    this.appStateService.setMap(this.map)
    this.map.layers = true
    // this.map.markers = true
    this.map.mostrarCercanos = true
    this.map.mostrarMarkers = true
    this.map.mostrarBarrios = true
    this.map.radius = 500
    this.map.mostrarRadio = true
    this.app.mapaIniciado = true



    console.log("MY POSICION ES", this.map.myPosition)


    this.map.enrutando = false;



    this.map
      .on("zoomstart", ($event) => {
        console.log("ZOOM ACTUAL: " + $event.target._zoom)
      })
      .on("contextmenu", ($event) => {
        console.log("derecho click en " + $event.latlng)
        console.log($event)
        this.botonderecho($event)
      })
      .on("mousedown", (($event) => {
        {
          console.log($event)
        }
      }))
      .on("swipe", function (event) { console.log("se ha hecho swipe") })


    this.addContentToMap()

    // this.map.on("click", calcularDistancia)
    this.markerService.addMarkerOnMyLocation(this.map)
    this.addMarkers()
    this.eventosService.setEventosDescargados(this.arrayEventos)
    this.eventosService.setEventosSeleccionados(this.eventosService.getEventosCercanos())
  }


  addContentToMap() {


    this.map.getSize();



    L.Control.geocoder().addTo(this.map)
    this.layerService.addTiles(this.map)

    // var roads = L.gridLayer.googleMutant({
    //   type: 'satellite'	// valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    // })
    // roads.addTo(this.map);

    L.control.scale().addTo(this.map);
    //añade escala
    // this.markerService.createMarkerEspecial(this.map)
    // llamo al archivo de distritos y se lo paso al creador de layers
    this.datosBack.getDistritosLayer()
      .then((barriosgeoJson) => { this.layerService.initBarriosLayer(this.map, barriosgeoJson) })
      .catch((error) => { console.log(error) })

  }

  botonderecho($event) {


    this.generarMenu($event)

    // this.generarRuta($event.latlng)
    // document.body.removeChild(generatedMenu)
  }






  updateMyPosition(intervalo = 60000) {
    setInterval(async () => {
      this.markerService.addMarkerOnMyLocation(this.map, await this.getPosition())
    }, intervalo)
  }

  addMarkers() {

    console.log("add Markers vamos", this.arrayEventos.length)
    this.markerService.addMarkers(this.map, this.arrayEventos, this.map.radius);

  }

  generarMenu($event, nombreMenu = "ACCIONES") { // ME SACAS UN MENU{
    $('#menuContextual').show()


    // $event.stopPropagation();
    console.dir("CLICK DERECHO FUNCION " + $event.containerPoint)
    //   // estoy usando una mezcla de jQuery y JS, por eso originalEvent
    // $event.target.preventDefault()

    let menuContextual = document.getElementById("menuContextual")
    let x = $event.originalEvent.clientX
    let y = $event.originalEvent.clientY - 127
    this.nombreMenu = nombreMenu


    this.posicionNueva = $event.latlng
    menuContextual.style.position = "absolute"
    menuContextual.style.left = x + "px"
    menuContextual.style.top = y + "px"
    menuContextual.style.zIndex = "9999"

    $('#dropdownMenuButton').click()



    $('.dropdown').on('hidden.bs.dropdown', function () {
      setTimeout(() => { $('#menuContextual').hide() }, 200)
    })


    // $('.dropdown-toggle').dropdown('toggle')
    // 

    $('.dropdown-item').on('mousein', () => { $('dropdown-item').addClass('active') }).on('mouseout', () => { $('dropdown-item').removeClass('active') })


  }

  setMyPosition(posicion = this.map.myPosition) {

    setTimeout(() => {
      this.mostrarMenuDesplegable = false
    }, 1)  // hay que meterle esta mierda por el ngClass y el ngIf van a su puta bola


    console.log(this.posicionNueva)
    this.map.myPosition.coords.latitude = this.posicionNueva.lat
    this.map.myPosition.coords.longitude = this.posicionNueva.lng
    console.log(this.map.myPosition)
    this.markerService.removeCircle(this.map)
    this.markerService.addMarkerOnMyLocation(this.map, this.map.myPosition)
    this.markerService.removeMarkers(this.map)
    this.map.setView(new L.LatLng(this.posicionNueva.lat, this.posicionNueva.lng))
    if (this.map.mostrarMarkers) this.markerService.addMarkers(this.map, this.eventosService.getEventosDescargados(), this.map.radius)

    if ($('.dropdown').find('.dropdown-menu').is(":visible")) {
      $('.dropdown-toggle').dropdown('toggle');
    }

  }


  generarRuta(destino = this.posicionNueva, origen = this.map.posicion) {

    // hay que meterle esta mierda por el ngClass y el ngIf van a su puta bola

    this.map.enrutando = true;
    this.rutasService.generarRuta(this.map, origen, destino)
    setTimeout(() => {
      // $(".leaflet-routing-collapse-btn::after").css({ 'content': '_' })

      $(".leaflet-routing-collapse-btn").on("click", (event) => {

        this.rutasService.limpiarRutas(this.app.map)
        console.log(event)
        event.preventDefault

      })
    }, 1000)


    if ($('.dropdown').find('.dropdown-menu').is(":visible")) {
      $('.dropdown-toggle').dropdown('toggle');
    }


  }

  eventosDistrito() {

    let buscarCadena = this.map.lastBarrio.toUpperCase().slice(0, 8).replace(" ", "")
    this.datosBack.getEventosByAnyFields([
      { "field": "distrito", "valor": buscarCadena },
      { "field": "distrito", "valor": funcionesComunes.reemplazarAcentos(buscarCadena), "operador": "OR" },
      { "field": "barrioScrap", "valor": funcionesComunes.reemplazarAcentos(buscarCadena), "operador": "OR" }
    ])
      .then((results) => {
        console.log("se ha buscado eventos por " + buscarCadena + "han llegado ", results.length + " resultados")

        this.eventosService.setEventosSeleccionados(this.eventosService.getEventosSeleccionados().concat(results))
        this.markerService.addMarkers(this.app.map, results, 10000000)
      })
      .catch((reason) => { console.log(reason) })
  }
  eventosGlobales() {
    console.log("Globales")
    this.eventosService.setEventosSeleccionados(this.eventosService.getEventosDescargados())
    this.eventosService.setEventosCercanos(this.eventosService.getEventosDescargados())
    this.markerService.addMarkers(this.app.map, this.eventosService.getEventosDescargados(), this.app.map.radius)
  }


}

