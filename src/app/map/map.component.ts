

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FiltrarService } from '../services/filtrar.service';
import { LayerService } from '../services/layer.service';
import { RutasService } from '../services/rutas.service';
// import 'leaflet-control-geocoder'
import { AppStateService } from '../services/appstate.service';
import { MarkerService } from '../services/marker.service';
import { datosBackService } from '../services/datosBack.service';
import { EventosService } from '../services/eventos.service';
import { getHtmlTagDefinition } from '@angular/compiler';

declare let L
declare let Routing
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

  constructor(
    private markerService: MarkerService,
    private layerService: LayerService,
    private datosBack: datosBackService,
    private filtrarService: FiltrarService,
    private eventosService: EventosService,
    private rutasService: RutasService
    , private appStateService: AppStateService) { }

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
      zoom: 10,
      // minZoom: 10

    })

    this.map.myPosition = { coords: { latitude: position.coords.latitude, longitude: position.coords.longitude } }
    this.map.radius = 1000
    this.map.barrios = true
    this.map.layers = true
    this.map.markers = true
    this.map.mostrarCercanos = true
    this.app.map = this.map


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

    let tileLayer = { openStreet: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", mapBox: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazQ4emZjM3gwMm1oM2ttcGN3aTY0YWQ2In0.Dygl0-a1eJgQq1vSAKc1eQ" }
    this.map.getSize();
    // 
    const tiles = L.tileLayer(tileLayer.mapBox, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      tileSize: 256,
      maxZoom: 55,
      id: 'mapbox.streets',
      accessToken: "pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazQ4emZjM3gwMm1oM2ttcGN3aTY0YWQ2In0.Dygl0-a1eJgQq1vSAKc1eQ"
    })
    L.Control.geocoder().addTo(this.map)
    tiles.addTo(this.map);

    // var roads = L.gridLayer.googleMutant({
    //   type: 'satellite'	// valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    // })
    // roads.addTo(this.map);


    //leo datos y los paso al servicio de markers para dibujarlos
    // this.datosBack.getAllEventos()
    //   .then((datos) => {
    //     console.log("hemos cargado los datos de tamaño : ", datos['length'])
    //     this.datosGlobales = datos;
    //     console.log("markers iniciales añadidos")
    //   })
    //   .catch((error) => { console.log(error) })
    //   .finally(() => {
    //     this.appStateService.setCargando(false)

    //   })


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

    this.generarRuta($event.latlng)
    // document.body.removeChild(generatedMenu)
  }

  generarMenu($event) { // ME SACAS UN MENU{
    console.dir("CLICK DERECHO FUNCION " + $event.containerPoint)
    // estoy usando una mezcla de jQuery y JS, por eso originalEvent
    let x = $event.originalEvent.clientX
    let y = $event.originalEvent.clientY


    console.log(x, y)
    let generatedMenu = document.createElement("div")
    generatedMenu.innerHTML = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Dropdown button
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div>
  </div>`
    generatedMenu.style.position = "absolute"
    generatedMenu.style.left = x + "px"
    generatedMenu.style.top = y + "px"
    generatedMenu.style.zIndex = "9999"
    document.body.appendChild(generatedMenu);
    document.querySelector("#dropdownMenuButton").setAttribute("aria-expanded", "true")
  }



  generarRuta(destino, origen = this.map.posicion) {
    this.map.enrutando = true;
    this.rutasService.generarRuta(this.map, origen, destino)
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


}


