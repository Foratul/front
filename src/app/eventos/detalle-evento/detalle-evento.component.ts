import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { datosBackService } from 'src/app/services/datosBack.service';
import { Router } from '@angular/router';
import { AppStateService } from 'src/app/services/appstate.service';
import { MarkerService } from 'src/app/services/marker.service';
import { StreetViewPanorama } from '@ngui/map/directives/street-view-panorama';

// import "https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&callback=initialize"

declare let funcionesComunes
declare let $
declare let google

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {
  evento: any
  app
  modal
  mapOptions
  pos
  arrayObjetos = []
  constructor(
    private appState: AppStateService,
    private eventoService: EventosService,
    private datosBack: datosBackService,
    private router: Router,
    private markerService: MarkerService
  ) { }

  ngOnInit() {








    $(".leaflet-popup-close-button").click()

    this.app = this.appState.getAppState()
    let objeto
    this.evento = this.eventoService.getEventoSeleccionado()
    console.log("soy detalle evento y tengo", this.evento)
    for (const key in this.evento) {
      if (this.evento.hasOwnProperty(key)) {
        const element = this.evento[key];
        objeto = { clave: key, valor: element }
        this.arrayObjetos.push(objeto)
      }

    }

    // center="40.6892,-74.0444" zoom="18" map-type-id="MapTypeId.SATELLITE" tilt="45"
    // streetView="StreetViewPanorama(document.querySelector('div#sv'), {position:new google.maps.LatLng(40.688738,-74.043871)})">
    this.pos = { lat: this.evento.latitude, lng: this.evento.longitude }
    this.mapOptions = {


      center: { lat: this.evento.latitude, lng: this.evento.longitude },
      zoom: 18,
      mapTypeId: 'satellite',
      tilt: 45,


    };

    // var berkeley = { lat: 37.869085, lng: -122.254775 };
    // var sv = new google.maps.StreetViewService();

    // let panorama = new google.maps.StreetViewPanorama(document.getElementById('sv'));
    // sv.getPanorama({ location: berkeley, radius: 50 });
    // panorama.setVisible(true);



    this.compruebaComentarios(this.evento.ID)

  }

  campoClicado(objeto) {


    console.log("campoclicado, me han llegado : ", objeto)

    this.datosBack.getEventosByAnyFields([{ field: objeto.field, valor: objeto.valor.toUpperCase().trim() }]).then((results) => {
      console.log("me han devuelto un array de ", results.length)
      {
        if (results.length > 0) {
          this.eventoService.setEventosSeleccionados(results)
          this.eventoService.setEventosDescargados(results)
        }
        this.app.menu_desplegado = false
        this.app.paginaDesplegada = "MENU"
        this.app.paginaMain = "HOME"
        setTimeout(() => {
          this.app.paginaMain = "listarEventos"
        }, 1)

        // this.router.navigate['/eventos']
      }

    }

    ).catch((error) => { console.log(error) })

  }

  mostrarMapa(evento) {
    if (evento.latitude) { }
    evento.mostrar = true
    console.log("funcion mostraMapa", evento)
    this.eventoService.setEventosSeleccionados([evento])
    this.app.menu_desplegado = false;
    this.app.paginaDesplegada = "MENU"
    this.appState.setMostrarMapa(true)
    this.markerService.createMarkerEspecial(this.app.map, evento)
    this.markerService.removeCircle(this.app.map)
    this.markerService.removeMarkers(this.app.map)
    this.app.map.mostrarMarkers = false
    this.app.map.mostrarRadio = false
    this.appState.actualizaBotonera(this.app.map)


  }

  compruebaComentarios(eventoID) {
    console.log("ver Comentarios clicado", eventoID)
    this.datosBack.getComentarioByEventoID(eventoID).then((arrayComentarios) => {

      this.app.arrayComentarios = arrayComentarios


      console.log("Este evento tiene este array de comentarios", arrayComentarios)
      if (arrayComentarios.length > 0) {
        this.evento.nota = 0
        for (const comentario of arrayComentarios) { //el reduce no estaba funcionando por alguna razons , asi que a lo bulce
          this.evento.nota += comentario.valoracion
        }
        this.evento.votantes = arrayComentarios.length
        this.evento.valoraciones = funcionesComunes.convertirNumeroAEstrellas(this.evento.nota / this.evento.votantes)
        console.log("he mandado a dibujar estrellas ", this.evento.nota / this.evento.votantes)
      }
    })

      .catch((err) => { console.log(err) })

  }

  verComentarios() {
    this.app.menu_desplegado = true
    this.app.paginaDesplegable = "listarComentarios"
    this.app.paginaPrevia = "detalleEvento"
  }

  addComentario(evento) {

    this.eventoService.setEventoSeleccionado(evento);
    this.app.modal.insertComentario = true
    $('#modalSpan').text('Buscador');




  }



  mostrarGlobales(evento) { }
  mostrarCercanos(evento) { }
  onMarkerInit($event) { }


}
