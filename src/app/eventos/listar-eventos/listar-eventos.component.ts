import { Component, OnInit, Output } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AppStateService } from 'src/app/services/appstate.service';
import { Router } from '@angular/router';
import { datosBackService } from 'src/app/services/datosBack.service';
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
  app
  ascendente: boolean = true
  modal: any;
  ordenar: string = "ABC"
  textoAscendente = "Ascendente"
  regexp = new RegExp(/[^a-zA-Z0-9 ]/g)

  constructor(
    private eventosService: EventosService,
    private appState: AppStateService,
    private router: Router,
    private datosService: datosBackService) { }

  ngOnInit() {

    this.app = this.appState.getAppState()

    $('#exampleModalCenter')
      .on('shown.bs.modal', () => {
        $('#myInput').trigger('focus')
      })
      .on('hidden.bs.modal', () => {
        this.modal = false
        $("#exampleModalCenter .close").click()
        this.modal = false
      })

      .on('hide.bs.modal', () => {
        // this.comprobarComentarios(this.arrayEventos)
      })

    $('.close').click(() => {
      this.modal = false
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      })
    })




    // this.arrayEventos = this.aleatorizarArray(this.eventosService.getEventosCercanos())
    this.arrayEventos = this.eventosService.getEventosSeleccionados()
    // alert("soy listar eventos, tengo array de " + this.arrayEventos.length)

    this.paginasTotales = Math.floor(this.arrayEventos.length / this.porPagina) + 1
    this.ordenarArrayPor(this.arrayEventos, "ABC")
    this.actualizarEventosVisibles() //cosas de la pagina, mostrar 20, 30, 100 etc , return un arrayEventosVisibles


    // this.comprobarComentarios(this.arrayEventos)
  }

  comprobarComentarios(arrayEventos) {

    this.datosService.getEventosComentarios().then((results) => {


      arrayEventos.forEach(evento => {
        
      });
      for (const evento of arrayEventos) {

        
      }



    })

    for (const evento of arrayEventos) {
      // console.log("voy a buscar comentarios de  " + evento.ID)
      this.datosService.getComentarioByEventoID(evento.ID) //comprueba si un evento tiene comentarios
        .then((results) => {
          if (results.length > 0) {
            let arrayComentarios = results;
            console.log(evento.ID, " tiene este array de comentarios", results)

            evento.nota = 0
            for (const comentario of arrayComentarios) { //el reduce no estaba funcionando por alguna razons , asi que a lo bulce
              evento.nota += comentario.valoracion
            }
            evento.votantes = arrayComentarios.length
            evento.valoraciones = funcionesComunes.convertirNumeroAEstrellas(evento.nota / evento.votantes)
            console.log("he mandado a dibujar estrellas ", evento.nota / evento.votantes)

          }
        })
        .catch((err) => { console.log(err) })

      // llamas a base de datos y que lo mire y ya le mando a la vista al html lo que sea con ngIf
    }
  }


  modalClick(evento) {

    this.eventosService.setEventoSeleccionado(evento);
    this.modal = true
    this.appState.setModal(true)

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


  dejarComentarios(evento) {
    this.eventosService.setEventoSeleccionado(evento)
    this.router.navigate([`/comentar/${evento.ID}`])
  }



  ascendenteOrden() {
    console.log("click en ascendenteorden")
    this.ascendente = !this.ascendente
    this.textoAscendente = (this.ascendente) ? "ascendente" : "descendente"
    this.arrayEventos.reverse()
    this.actualizarEventosVisibles()
    this.paginaActual = 1

  }

  async ordenarPor(ordenar = this.ordenar) {


    this.ascendente = true
    this.textoAscendente = "ascendente"


    switch (ordenar) {
      case "ABC":
        this.ordenarArrayPor(this.arrayEventos, "ABC")


        break;

      case "SCORE":

        this.ordenarArrayPor(this.arrayEventos, "SCORE")
        this.ascendente = false;
        this.textoAscendente = this.textoAscendente = "descendente"


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
      this.app.paginaDesplegble = "listarComentarios"
    }))
      .catch((err) => { console.log("error al pedir ComentariosByEvento ") })
  }

  detalleEvento(evento) {
    console.log("a detalleEvento ha llegado", evento)
    this.eventosService.setEventoSeleccionado(evento)
    this.app.menu_desplegado = true
    this.app.paginaDesplegable = "detalleEvento"


  }
}




