

import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MarkerService } from '../marker.service';
import { PeticionesDatosService } from '../peticiones-datos.service';
import { FiltrarService } from '../filtrar.service';
import { LayerService } from '../layer.service';
import { RutasService } from '../rutas.service';
import 'leaflet-control-geocoder'

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
  datosGlobales = []
  distritos = []

  constructor(
    private markerService: MarkerService,
    private layerService: LayerService,
    private peticionesDatosService: PeticionesDatosService,
    private filtrarService: FiltrarService,
    private rutasService: RutasService) { }
  @Input() cargando: boolean;
  ngOnInit() { }
  ngAfterViewInit() {



    this.getPosition()
      .then((position) => {
        // position = { coords: { latitude: 40.458121, longitude: -3.700676 } }
        //para empezar en TETUAN
        this.initMap(position)
      })
      .catch((error) => {
        alert(error)
        this.initMap(
          { coords: { latitude: 40.458121, longitude: -3.700676 } }
        )
      })

  }
  getPosition() {

    let prom = new Promise((resolve, reject) => {
      if (!navigator.geolocation) reject("GEOLOCALIZACION NO FUNCIONA")
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position)
        reject("ERROR, no se puede GEOLOCALIZAR")
      }, (error) => {
        reject("ERROR, este dispositivo no permite GEOLOCALIZAR; SE USARÁ UNA POSICION POR DEFECTO")
      })
    })
    return prom;
  }
  initMap(position): void {

    // mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazI5YnFtNWIyaHcxM2lucnd5ZTJuZWd3In0._XB0qU2AeBff9ThO003CFw';
    // var map = new mapboxgl.Map({
    //   container: 'YOUR_CONTAINER_ELEMENT_ID',
    //   style: 'mapbox://styles/mapbox/streets-v11'
    // });

    this.map = new L.map('map', {
      center: [position.coords.latitude, position.coords.longitude],
      zoom: 15,
      // minZoom: 10
    })

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

    this.map.position = position;

    // this.map.on("click", calcularDistancia)


    this.markerService.addMarkerOnMyLocation(this.map)


  }
  addContentToMap() {
    this.map.getSize();
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'your.mapbox.access.token'
    })
    L.Control.geocoder().addTo(this.map)
    tiles.addTo(this.map);
    // var roads = L.gridLayer.googleMutant({
    //   type: 'satellite'	// valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
    // })
    // roads.addTo(this.map);





    //leo datos y los paso al servicio de markers para dibujarlos
    this.peticionesDatosService.getJson()
      .then((datos) => {
        this.datosGlobales = datos['@graph'];
        this.markerService.addMarkers(this.map, this.datosGlobales);
        console.log("markers añadidos")
      })
      .catch((error) => { console.log(error) })
      .finally(() => {
        this.cargando = false;
      })

    L.control.scale().addTo(this.map);
    //añade escala
    this.markerService.createMarkerEspecial(this.map)
    // llamo al archivo de distritos y se lo paso al creador de layers
    this.peticionesDatosService.getDistritosLayer()
      .then((barriosgeoJson) => { this.layerService.initBarriosLayer(this.map, barriosgeoJson) })
      .catch((error) => { console.log(error) })
  }

  botonderecho($event) {

    // ME SACAS UN MENU{
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

    this.generarRuta($event.latlng)
    // document.body.removeChild(generatedMenu)


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


}


