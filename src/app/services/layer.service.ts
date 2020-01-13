import { Injectable } from '@angular/core';
import * as L from 'leaflet';

import { MarkerService } from './marker.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  arrayLayers: any = [];
  barriosactivos = true;
  tileLayer = { openStreet: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", mapBox: "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazQ4emZjM3gwMm1oM2ttcGN3aTY0YWQ2In0.Dygl0-a1eJgQq1vSAKc1eQ", openTopoMap: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", cycloOSM: 'https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', hydda: 'https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png' }
  arrayMotores = [this.tileLayer.openStreet, this.tileLayer.mapBox, this.tileLayer.openTopoMap, this.tileLayer.cycloOSM, this.tileLayer.hydda]
  tilesActual
  motorActual = 0


  constructor(private markerService: MarkerService) {
  }

  map: any;

  // metodo que dibuja en mapa a partir de geoJSon

  initBarriosLayer(map, barriosgeoJson) {
    this.map = map;
    this.map.enrutando = false;
    const barrioLayer = L.geoJSON(barriosgeoJson, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.6,
        color: '#008f68',
        fillOpacity: 0.4,
        fillColor: '#6DB65B'
        , dashArray: '20, 20', dashOffset: '20'

      }),
      //leaftet iterador
      onEachFeature: (feature, layer) => {
        layer
          .on({
            mouseover: ($event) => {

              // $event.target.bringToFront()
              let zoom = $event.target._map.zoomControl._map._zoom

              if (zoom < 1000) { this.highlightFeature($event) }
            },
            mouseout: ($event) => { this.resetFeature($event) }
          })
          .bindTooltip(feature.properties.NOMBRE)
          .on("contextmenu", () => {
            console.log(feature.properties)
            this.map.lastBarrio = feature.properties.NOMBRE
          })
        // tambien en $event.target.feature.properties.name
        // ESTO GENERA UNA POSICION SEMI CENTRADA EN UN LAYER
        // this.markerService.addMarkerOnPosition(map, $event.target.getBounds().getCenter())



      }
    });

    map.addLayer(barrioLayer);
    this.arrayLayers.push(barrioLayer)

  }

  private highlightFeature(event) {

    if (!this.map.enrutando) {
      const layer = event.target;
      layer.setStyle({
        weight: event.target._map.zoomControl._map._zoom / 10,
        opacity: 0.8,
        color: '#DFA612',
        fillOpacity: 0.5,
        fillColor: '#FAE042',
        dashArray: '20, 20', dashOffset: '20'
      })
        .bringToFront();
    }
  }
  private resetFeature(event) {
    const layer = event.target;
    layer.setStyle({
      weight: 3,
      opacity: 0.6,
      color: '#008f68',
      fillOpacity: 0.4,
      fillColor: '#6DB65B'
    });
  }

  removeBarrios(map) { map.removeLayer(this.arrayLayers[0]) }
  restoreBarrios(map) { map.addLayer(this.arrayLayers[0]) }




  addTiles(map) {
    let layer = this.arrayMotores[this.motorActual]

    const tiles = L.tileLayer(layer, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      tileSize: 256,
      maxZoom: 55,
      id: 'mapbox.streets',
      accessToken: "pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazQ4emZjM3gwMm1oM2ttcGN3aTY0YWQ2In0.Dygl0-a1eJgQq1vSAKc1eQ"
    })
    this.tilesActual = tiles;
    this.motorActual = (this.motorActual + 1) % this.arrayMotores.length
    tiles.addTo(map);

  }
  removeTiles() {
    this.tilesActual.remove();
  }
}


