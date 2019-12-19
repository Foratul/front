import { Component, OnInit, Output } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AppStateService } from 'src/app/services/appstate.service';
import { Router } from '@angular/router';
import { datosBackService } from 'src/app/services/datosBack.service';
import { Observable, Subject } from 'rxjs';
declare let $
declare let funcionesComunes

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  arrayEventos: Array<any> = []
  porPagina: number = 12;
  paginaActual: number = 1
  arrayEventosVisibles: Array<any> = []
  paginasTotales: number;
  comentario
  mensaje: string = "Sin valoraciones. Se el primero en dejar un comentario"
  icono = "<i class='orange fas fa-star'</i>"
  medioicono = "<i class='orange fas fa-star-half'</i>"

  ascendente: boolean = true
  // modal: any;
  ordenar: string = "ABC"
  textoAscendente = "Ascendente"
  regexp = new RegExp(/[^a-zA-Z0-9 ]/g)
  iconoAscendente = '<i class="fas fa-sort-alpha-down"></i>'
  cercanos = false
  criterioCercania = "Mostrando todos los coincidentes"
  observar = new Observable()
  app
  stringVar = new Subject<string>();
  subscripcion
  constructor(
    private eventosService: EventosService,
    private appState: AppStateService,
    private router: Router,
    private datosService: datosBackService) { }



  ngOnInit() {

    this.app = this.appState.getAppState()


    this.subscripcion = this.app.comentarioExitoso$.subscribe((datos) => {
      if (datos) {

        // alert("el observable ha cambiado")
        this.comentarioExitoso()
      }
    })
    console.log("hay descargados " + this.eventosService.getEventosDescargados().length,
      "hay seleccionados : " + this.eventosService.getEventosSeleccionados().length,
      "hay cercanos:" + this.eventosService.getEventosCercanos().length)
    // this.arrayEventos = this.aleatorizarArray(this.eventosService.getEventosCercanos())
    this.arrayEventos = this.eventosService.getEventosDescargados()
    this.refrescarListado()
    this.comprobarComentarios(this.arrayEventos)

  }
  refrescarListado() {
    this.paginasTotales = Math.floor(this.arrayEventos.length / this.porPagina) + 1
    this.ordenarArrayPor(this.arrayEventos, this.ordenar)
    this.actualizarEventosVisibles() //cosas de la pagina, mostrar 20, 30, 100 etc , return un arrayEventosVisibles
  }
  // alert("soy listar eventos, tengo array de " + this.arrayEventos.length)

  comprobarComentarios(arrayEventos) {
    let a = Date.now()

    this.datosService.getEventosComentarios().then((results) => {
      //me traigo la tabla de indices


      let arrayEventosID = results.map((item) => { return item.eventoID })
      let arrayIDEventos = arrayEventos.map((item) => { return item.ID })

      // saco los indices de la tabla de indices

      let arrayEventosConComentarios = arrayIDEventos.filter((item) => { return arrayEventosID.includes(item) })
      console.log(arrayEventosConComentarios)

      for (const id of arrayEventosConComentarios) {
        console.log("pido comentarios de id = ", id)
        let evento = arrayEventos.find((item) => { return item.ID == id })

        // console.log("voy a buscar comentarios de  " + evento.ID)
        this.datosService.getComentarioByEventoID(id) //comprueba si un evento tiene comentarios
          .then((results) => {
            if (results.length > 0) {
              let arrayComentarios = results;
              console.log(id, " tiene este array de comentarios", results)

              evento.nota = 0
              for (const comentario of arrayComentarios) { //el reduce no estaba funcionando por alguna razons , asi que a lo bulce
                evento.nota += comentario.valoracion
              }
              evento.votantes = arrayComentarios.length
              evento.valoraciones = funcionesComunes.convertirNumeroAEstrellas(evento.nota / evento.votantes)
              console.log("he mandado a dibujar estrellas para el evento ID", evento.ID, evento.nota / evento.votantes)

            }
          })
          .catch((err) => { console.log(err) })

        // llamas a base de datos y que lo mire y ya le mando a la vista al html lo que sea con ngIf
      }
      let b = Date.now()
      console.log("el algoritmo ha tardado" + (b - a))
      //3600
    })
  }



  addComentario(evento) {

    this.eventosService.setEventoSeleccionado(evento);
    this.app.modal.insertComentario = true
    // this.appState.setModal(true)

  }



  drop($event) {
    moveItemInArray(this.arrayEventosVisibles, $event.previousIndex, $event.currentIndex);
  }

  botonPagina(avance) {
    this.paginaActual += avance
    if (this.paginaActual < 1) {
      this.paginaActual = 1
      return
    }
    if (this.paginaActual > this.paginasTotales) {
      this.paginaActual = this.paginasTotales
      return
    }
    this.actualizarEventosVisibles()
  }

  actualizarEventosVisibles() {
    this.paginasTotales = Math.floor(this.arrayEventos.length / this.porPagina) + 1 // por si hemos cambiaro el porPagina del select

    this.arrayEventosVisibles = this.arrayEventos.filter((elemento, index) => {
      if (index >= ((this.paginaActual - 1) * this.porPagina) && index < (this.paginaActual * this.porPagina))
        return elemento
    })
  }

  aleatorizarArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    } return array

  }


  // dejarComentarios(evento) {
  //   this.eventosService.setEventoSeleccionado(evento)
  //   this.router.navigate([`/comentar/${evento.ID}`])
  // }



  ascendenteOrden() {
    console.log("click en ascendenteorden")
    this.ascendente = !this.ascendente
    this.actualizarIconoOrden()
    this.arrayEventos.reverse()
    this.actualizarEventosVisibles()
    this.paginaActual = 1

  }

  actualizarIconoOrden() {
    if (this.ordenar === "ABC") { this.iconoAscendente = (this.ascendente) ? '<i class="fas fa-sort-alpha-down-alt"></i>' : '<i class="fas fa-sort-alpha-down"></i>' }
    else this.iconoAscendente = (this.ascendente) ? '<i class="fas fa-sort-amount-down-alt"></i>' : '<i class="fas fa-sort-amount-down"></i>'
  }

  async ordenarPor(ordenar = this.ordenar) {


    this.ascendente = true
    this.actualizarIconoOrden()

    switch (ordenar) {
      case "ABC":
        this.ordenarArrayPor(this.arrayEventos, "ABC")


        break;

      case "SCORE":

        this.ordenarArrayPor(this.arrayEventos, "SCORE")
        this.ascendente = false;
        this.actualizarIconoOrden()


        break;

      case "VIEWS":

        this.ordenarArrayPor(this.arrayEventos, "VIEWS")

        break;

      case "RANDOM":

        this.ordenarArrayPor(this.arrayEventos, "RANDOM")

        break;
      case "DISTANCE":
        break;
    }

    this.paginaActual = 1
    this.actualizarEventosVisibles()


  }



  ordenarArrayPor(array, metodo) {
    if (metodo == "ABC") array.sort((a, b) => a.nombre.replace(this.regexp, "") > b.nombre.replace(this.regexp, "") ? 1 : -1)
    if (metodo == "SCORE") this.arrayEventos.sort((a, b) => {
      return (b.nota ? b.nota / b.votantes : 0) - (a.nota ? a.nota / a.votantes : 0)
    })
    if (metodo == "VIEWS") this.arrayEventos.sort(function (a, b) { return b.visitas - a.visitas })
    if (metodo == "RANDOM") this.arrayEventos = this.aleatorizarArray(this.arrayEventos)
    if (metodo == "DISTANCE") { }

  }

  comentarioExitoso() {
    alert("exito evento")

    this.ordenarArrayPor(this.arrayEventos, this.ordenar)
    this.actualizarEventosVisibles()

    // this.comprobarComentarios(this.arrayEventos)
    // this.actualizarEventosVisibles()

  }
  verComentarios(eventoID) {
    console.log("ver Comentarios clicado", eventoID)
    this.datosService.getComentarioByEventoID(eventoID).then((arrayComentarios => {

      this.app.arrayComentarios = arrayComentarios
      this.app.menu_desplegado = true
      this.app.paginaDesplegable = "listarComentarios"
    }))
      .catch((err) => { console.log("error al pedir ComentariosByEvento ") })
  }

  detalleEvento(evento) {
    console.log("a detalleEvento ha llegado", evento)
    this.eventosService.setEventoSeleccionado(evento)
    this.app.menu_desplegado = true
    this.app.paginaDesplegable = "detalleEvento"


  }

  toggleCercanos() {
    this.cercanos = !this.cercanos
    this.criterioCercania = (this.cercanos) ? `Mostrando solo cercanos (${this.app.map.radius} m)` : `Mostrando todos los coincidentes`
    this.arrayEventos = (this.cercanos) ? this.eventosService.getEventosCercanos() : this.eventosService.getEventosDescargados()
    this.refrescarListado()

  }
}




