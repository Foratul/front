import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { Marker } from 'leaflet';
import { Icono } from '../Icono';
import { AppStateService } from './appstate.service';
import { EventosService } from './eventos.service';
declare let $

@Injectable({
  providedIn: 'root'

})
export class MarkerService {

  arrayMarkersActivos: Array<Marker> = []
  arrayMarkersMyPosition: Array<Marker> = []
  currentArrayDatos: Array<Marker>
  arrayVisibles: Array<any>
  icono = new Icono()
  circle


  constructor(
    private appStateService: AppStateService,
    private popUpService: PopUpService,
    private eventosService: EventosService
  ) {
    Marker.prototype.options.icon = this.icono.defaultIcon

  }

  addMarkerOnPosition(map, position) {
    const marker = L.marker(position)
    // console.log(marker)
    marker.addTo(map);

  }

  addCircle(map, position = map.myPosition, radius = map.radius) {
    this.circle = L.circle([position.coords.latitude, position.coords.longitude], { radius: radius, dashArray: '20, 20', dashOffset: '20', weight: 6, fillOpacity: 0.4, opacity: 0.6 })
    console.log("creadno cirlca")
    this.circle.addTo(map).bringToBack();
    map.radio = true
  }

  removeCircle(map) {
    console.log("destrueydno cirlca")

    map.removeLayer(this.circle)
    map.radio = false


  }
  addMarkerOnMyLocation(map, position = map.myPosition) {

    const marker = L.marker([position.coords.latitude, position.coords.longitude], { title: "POSICION ACTUAL", draggable: true, icon: this.icono.positionIcon, zIndexOffset: 666666, riseOnHover: true })
    marker.addTo(map);
    this.addCircle(map, map.position, map.radius)
    marker.bindPopup(this.popUpService.addPopUp({ className: "PopUp" }))
      .on('mouseover', function (event) { marker.openPopup() })
      .on('mouseout', function (event) { marker.closePopup() })
      .on('dragstart', () => {
      })
      .on('dragend', (event) => {
        console.log("DRAGEND")
        // map.removeLayer(this.arrayMarkersMyPosition[this.arrayMarkersMyPosition.length - 1])
        map.myPosition.coords.latitude = event.target['_latlng'].lat
        map.myPosition.coords.longitude = event.target['_latlng'].lng
        this.removeCircle(map)
        this.addCircle(map)
        if (map.markers) {
          this.removeMarkers(map)
          this.addMarkers(map, null, map.radius)
        }
        this.appStateService.setCargando(false)
      })

    // this.arrayMarkersMyPosition.pop()
    this.arrayMarkersMyPosition.push(marker)


  }
  addMarkers(map, arrayDatos, radius = 1000) {
    this.appStateService.setCargando(true)

    if (arrayDatos == null) arrayDatos = this.currentArrayDatos  //mete el ultimo array recibido en el servicio
    this.currentArrayDatos = arrayDatos
    console.log("voy a dibujar los markers en un radio de : ", radius, "tengo un array de tamaño ", arrayDatos.length)

    this.arrayVisibles = [] //vacia lo visible porque se recrea

    map.radius = radius

    for (const [index, elemento] of arrayDatos.entries()) {
      if (elemento.latitude && elemento.longitude) { //comprueba que traen lat y lng antes de añadir
        const marker = L.marker([elemento.latitude + Math.random() / 5000, elemento.longitude + Math.random() / 5000], { icon: this.icono.blueIcon, riseOnHover: true })
        if (map.distance(marker.getLatLng(), this.arrayMarkersMyPosition[this.arrayMarkersMyPosition.length - 1].getLatLng()) < radius) {

          let pepe = L.popup({ className: "RAJOY" }).setContent("VIVA EL VINO")
          elemento.arrayIndex = index //para pasarselo al popup binder luego
          marker.bindPopup(this.popUpService.addPopUp(elemento));
          // marker.bindPopup(pepe)
          //  let buton = document.getElementById("infoPopUp")
          // marker['barrio'] = Math.random();
          // console.log(map.distance(marker.getLatLng(), marker.getLatLng()))
          marker.addTo(map);
          marker.on("click", ($event) => {
            let boton = document.getElementById("infoPopUp")
            boton.addEventListener("click", this.ampliarInformacion)
            // console.log(marker['barrio'])
          })
          this.arrayVisibles.push(elemento)
          this.arrayMarkersActivos.push(marker)
          if (elemento.centrar) map.setView(new L.LatLng(elemento.latitude, elemento.longitude), 8);
        }
        this.eventosService.setEventosCercanos(this.arrayVisibles)
      }

    }



    console.log("he pintado los markers")

    this.appStateService.setCargando(false)

  }

  prueba(app) {

    app.cargando = !app.cargando

  }


  ampliarInformacion(evento) {
    //el maldito dataset te lo pasa en minusculas
    console.log(evento.target.dataset)
    let popup = document.querySelector(".leaflet-popup") as HTMLElement
    popup.style.top = "-100px"
    console.log("se ha clicado en el arrayMarker numero:", evento.target.dataset.arrayindex)
    console.log("se ha clicado en el dbID numero:", evento.target.dataset.id)
    let popupElement = document.querySelector("#popUpText")
    popupElement.innerHTML += "L-OREM-"
    $(".leaflet-popup-content").blur()


  }

  removeMarkers(map, arrayMarkers = this.arrayMarkersActivos, barrio = null) {
    console.log("removeMarkers")
    for (const marker of arrayMarkers) {
      map.removeLayer(marker)
    }
  }

  restoreMarkers(map, arrayMarkers = this.arrayMarkersActivos, barrio = null) {
    for (const marker of arrayMarkers) {
      map.addLayer(marker)
    }
  }

  returnVisibles() {
    console.log("return visibles, array de", this.arrayVisibles.length)
    return this.arrayVisibles
  }

  createMarkerEspecial(map, evento) {

    let marcadorEspecial = L.marker([evento.latitude, evento.longitude], { riseOnHover: true, icon: this.icono.greenIcon });
    marcadorEspecial.addTo(map)
    map.setView(new L.LatLng(evento.latitude, evento.longitude), 15)
  }

  getDistance(from, to) {
    var container = document.getElementById('distance');
    container.innerHTML = ("New Delhi to Mumbai - " + (from.distanceTo(to)).toFixed(0) / 1000) + ' km';
  }

  redibujarMarkers(map, radius) {

    this.removeMarkers(map)
    this.addMarkers(map, null, radius)
  }
}
