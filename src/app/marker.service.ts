import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { Marker } from 'leaflet';
import { Icono } from './Icono';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  arrayMarkersActivos: Array<Object> = []
  arrayMarkersMyPosition: Array<Object> = []
  icono = new Icono()

  constructor(
    private popUpService: PopUpService) {
    Marker.prototype.options.icon = this.icono.defaultIcon



  }

  addMarkerOnPosition(map, position) {
    const marker = L.marker(position)
    console.log(marker)
    marker.addTo(map);

  }
  addMarkerOnMyLocation(map, position = map.position) {
    const marker = L.marker([position.coords.latitude, position.coords.longitude], { title: "VIVA EL VINO", draggable: true, icon: this.icono.positionIcon })
    marker.addTo(map);
    marker.bindPopup(this.popUpService.addPopUp("THIS IS MY POS"))
      .on('mouseover', function (e) { marker.openPopup() })
      .on('mouseout', function (e) { marker.closePopup() })

    this.arrayMarkersMyPosition.pop()
    this.arrayMarkersMyPosition.push(marker)

  }
  addMarkers(map, arrayDatos, opciones = null) {

    var randomProperty = function (obj) {
      var claves = Object.keys(obj)
      return obj[claves[Math.round(claves.length * Math.random())]];
    };

    console.log(randomProperty(this.icono))


    for (const elemento of arrayDatos) {

      const marker = L.marker([elemento.location.latitude, elemento.location.longitude], { icon: this.icono.blackIcon })
      // console.log("contenido del dato" + JSON.stringify(elemento))
      marker.bindPopup(this.popUpService.addPopUp("marker"));
      marker['barrio'] = Math.random();
      marker.addTo(map);
      marker.on("click", function (e) { console.log(marker['barrio']) })
      this.arrayMarkersActivos.push(marker)
    }
  }

  removeMarkers(map, arrayMarkers = this.arrayMarkersActivos, barrio = null) {
    console.log("hola", arrayMarkers)
    for (const marker of arrayMarkers) {
      map.removeLayer(marker)
    }
  }

  restoreMarkers(map, arrayMarkers = this.arrayMarkersActivos, barrio = null) {
    for (const marker of arrayMarkers) {
      map.addLayer(marker)
    }
  }


  createMarkerEspecial(map) {
    console.log("INDIA")
    var markerFrom = L.circleMarker([28.6100, 77.2300], { color: "#F00", radius: 10 });
    var markerTo = L.circleMarker([18.9750, 72.8258], { color: "#4AFF00", radius: 10 });
    var from = markerFrom.getLatLng();
    var to = markerTo.getLatLng();
    markerFrom.bindPopup('Delhi ' + (from).toString());
    markerTo.bindPopup('Mumbai ' + (to).toString());
    map.addLayer(markerTo);
    map.addLayer(markerFrom);
    this.getDistance(from, to);
  }

  getDistance(from, to) {
    var container = document.getElementById('distance');
    container.innerHTML = ("New Delhi to Mumbai - " + (from.distanceTo(to)).toFixed(0) / 1000) + ' km';
  }


}
