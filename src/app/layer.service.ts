import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './marker.service';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  arrayLayers: any = [];
  barriosactivos = true;

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
      }),
      //leaftet iterador
      onEachFeature: (feature, layer) => {
        layer
          .on({
            mouseover: ($event) => {

              let zoom = $event.target._map.zoomControl._map._zoom

              if (zoom < 1000) { this.highlightFeature($event) }
            },
            mouseout: ($event) => { this.resetFeature($event) }
          })
          .bindTooltip(feature.properties.NOMBRE)
          .on("contextmenu", () => { console.log(feature.properties) })
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
        weight: event.target._map.zoomControl._map._zoom,
        opacity: 1.0,
        color: '#DFA612',
        fillOpacity: 0.5,
        fillColor: '#FAE042',
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
  toggleBarrios(map) {

    console.log("toggle")
    this.barriosactivos = !this.barriosactivos
    if (!this.barriosactivos) map.removeLayer(this.arrayLayers[0])
    else map.addLayer(this.arrayLayers[0])

  }

}
