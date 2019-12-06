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

}




