import { Injectable } from '@angular/core';
import 'leaflet'
declare let L
declare let Routing
import 'leaflet-routing-machine'
// import 'lrm-graphhopper'
import 'leaflet-control-geocoder'

@Injectable({ providedIn: 'root' })

export class RutasService {
  rutas: any = []

  constructor() { }

  toLatLng(position) {

    return { lat: position.coords.latitude, lng: position.coords.longitude }
  }

  generarRuta(map, origen = map.myPosition, destino) {

    // se necesitan obejtos del tipo lat lng

    if (origen == map.myPosition) origen = this.toLatLng(origen)

    console.log("generandoRuta con origen" + JSON.stringify(origen))
    console.log(destino)


    if (origen) {
      let nuevaRuta = L.Routing.control({
        waypoints: [
          L.latLng(origen),
          L.latLng(destino)],
        vehicle: 'foot',
        language: 'es',
        routeWhileDragging: true,
        // lineOptions: { styles: [{ color: 'black', opacity: 0.5, weight: 5 }] },
        showAlternatives: true,
        // altLineOptions: { styles: [{ color: '#ed6852', weight: 3 }] },
        collapsible: true,
        fitSelectedRoutes: true,
        // router: L.routing.mapbox('pk.eyJ1IjoiZm9yYXR1bCIsImEiOiJjazI5YnFtNWIyaHcxM2lucnd5ZTJuZWd3In0._XB0qU2AeBff9ThO003CFw', { profile: 'mapbox/walking' }),

        geocoder: L.Control.Geocoder.nominatim()
      }).addTo(map)
      console.log(nuevaRuta)
      // await this.map.setView({ lat: posicion['latitude'], lon: posicion['longitude'] })

      this.rutas.push(nuevaRuta)
    }



  }

  limpiarRutas(map) {

    for (const ruta of this.rutas) {
      map.removeControl(ruta)
    }
    map.enrutando = false
  }

}
