import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { Marker } from 'leaflet';
import { Icono } from '../Icono';
import { AppStateService } from './appstate.service';
import { EventosService } from './eventos.service';
import "leaflet.awesome-markers/dist/leaflet.awesome-markers";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { datosBackService } from './datosBack.service';
declare let $

@Injectable({
  providedIn: 'root'

})
export class MarkerService {
  app
  arrayMarkersActivos: Array<Marker> = []
  arrayMarkersMyPosition: Array<Marker> = []
  currentArrayDatos: Array<Marker>
  arrayVisibles: Array<any>
  icono = new Icono()
  circle
  self = this
  arraColores = ['white', 'red', 'darkred', 'lightred', 'orange', 'beige', 'green', 'darkgreen', 'lightgreen', 'blue', 'darkblue', 'lightblue', 'purple', 'darkpurple', 'pink', 'cadetblue', 'white', 'gray', 'lightgray', 'black']

  constructor(
    private appStateService: AppStateService,
    private popUpService: PopUpService,
    private eventosService: EventosService,
    private datosBack: datosBackService
  ) {
    this.app = appStateService.getAppState()
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
  }

  removeCircle(map) {
    console.log("destrueydno cirlca")
    map.removeLayer(this.circle)


  }
  addMarkerOnMyLocation(map, position = map.myPosition) {

    const marker = L.marker([position.coords.latitude, position.coords.longitude], { title: "ESTAMOS AQUÍ", draggable: true, icon: this.icono.positionIcon, zIndexOffset: 666666, riseOnHover: true })
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
        if (map.mostrarRadio) this.addCircle(map)
        this.removeMarkers(map) //esto te lo hace el addMarkers ya con remove visibles creo


        if (map.mostrarMarkers) {
          this.addMarkers(map, null, map.radius)
        }
        this.appStateService.setCargando(false)
      })

    // this.arrayMarkersMyPosition.pop()
    this.arrayMarkersMyPosition.push(marker)
    if (this.arrayMarkersMyPosition[this.arrayMarkersMyPosition.length - 2]) this.removeMarkers(map, [this.arrayMarkersMyPosition[this.arrayMarkersMyPosition.length - 2]])




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
        const marker = L.marker([elemento.latitude + Math.random() / 5000, elemento.longitude + Math.random() / 5000], { icon: this.determinarIcono(elemento), riseOnHover: true })
        if (map.distance(marker.getLatLng(), this.arrayMarkersMyPosition[this.arrayMarkersMyPosition.length - 1].getLatLng()) < radius) {
          elemento.esCercano = true
          elemento.arrayIndex = index //para pasarselo al popup binder luego
            ;
          // marker.bindPopup(pepe)
          // marker['barrio'] = Math.random();
          // console.log(map.distance(marker.getLatLng(), marker.getLatLng()))
          marker.bindPopup(this.popUpService.addPopUp(elemento))
          marker.addTo(map);
          marker.on("click", ($event) => {
            let boton = document.getElementById("infoPopUp")
            let _this = this;
            boton.addEventListener("click", this.ampliarInformacion.bind(_this))
            // console.log(marker['barrio'])
          })
          this.arrayVisibles.push(elemento)
          this.arrayMarkersActivos.push(marker)
          if (elemento.centrar) {
            map.setView(new L.LatLng(elemento.latitude, elemento.longitude), 15)
            elemento.centrra = false;
          }
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
    $(".leaflet-popup-content").blur()
    console.log(this, this.self)
    this.datosBack.getEventoByID(evento.target.dataset.id).then((results) => {
      this.eventosService.setEventoSeleccionado(results)
      this.app.menu_desplegado = true
      this.app.paginaDesplegable = "detalleEvento"
    })



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

    let marcadorEspecial = L.marker([evento.latitude, evento.longitude], { riseOnHover: true, icon: this.determinarIcono(evento) });
    marcadorEspecial.addTo(map)
    map.setView(new L.LatLng(evento.latitude, evento.longitude), 15)
    marcadorEspecial.bindPopup(this.popUpService.addPopUp(evento))
    marcadorEspecial.addTo(map);
    marcadorEspecial.on("click", ($event) => {
      let boton = document.getElementById("infoPopUp")
      let _this = this;
      boton.addEventListener("click", this.ampliarInformacion.bind(_this))
      // console.log(marker['barrio'])
    })
  }

  getDistance(from, to) {
    var container = document.getElementById('distance');
    container.innerHTML = ("New Delhi to Mumbai - " + (from.distanceTo(to)).toFixed(0) / 1000) + ' km';
  }

  redibujarMarkers(map, radius) {

    this.removeMarkers(map)
    this.addMarkers(map, null, radius)
  }



  determinarIcono(elemento) {

    switch (parseInt(elemento.superindex)) {
      case 1:
        return this.icono.culturaOcio
      case 2:
        return this.icono.deportes
      case 4:
        return this.icono.cementerio
      case 7:
        return this.icono.wifi
      case 9:
        return this.icono.estudioSala
      case 10:
        return this.icono.bibliotecaIcon
      case 11:
        return this.icono.parkIcon
      case 13:
        return (Math.random() > 0.49) ? this.icono.informacionMujeres : this.icono.informacionMujeres2
      case 14:
        return (Math.random() > 0.49) ? this.icono.informacionTurismo1 : this.icono.informacionTurismo2
      case 15:
        return (Math.random() > 0.49) ? this.icono.museos1 : this.icono.museos2
      case 16:
        return this.icono.monumentIcon
      case 17:
        return (Math.random() > 0.49) ? this.icono.churchIcon : this.icono.iglesias2
      default:
        return this.icono.blackIcon
    }


  }


}


