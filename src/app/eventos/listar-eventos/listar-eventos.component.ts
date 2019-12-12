import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { AppStateService } from 'src/app/services/appstate.service';
import { Router } from '@angular/router';
import { datosBackService } from 'src/app/services/datosBack.service';
declare let $

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  arrayEventos: Array<any> = []
  porPagina: number = 10;
  paginaActual: number = 1
  arrayEventosVisibles: Array<any> = []
  paginasTotales: number;
  comentario
  mensaje: string = "Sin valoraciones. Se el primero en dejar un comentario"
  icono = "<i class='orange fas fa-star'</i>"
  medioicono = "<i class='orange fas fa-star-half'</i>"
  app
  modal: any;
  ordenar: string = "Alfabéticamente"


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

    $('.close').click(() => {
      this.modal = false
    });

    $(function () {
      $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover'
      })
    })

    if (this.eventosService.getEventosCercanos()) {
      // this.arrayEventos = this.aleatorizarArray(this.eventosService.getEventosCercanos())
      this.arrayEventos = this.eventosService.getEventosCercanos()
      this.paginasTotales = Math.floor(this.arrayEventos.length / this.porPagina) + 1
      this.actualizarEventosVisibles() //cosas de la pagina, mostrar 20, 30, 100 etc , return un arrayEventosVisibles
    }

    for (const evento of this.arrayEventos) {
      this.comprobarComentarios(evento)
      console.log("comprobando " + evento.ID)
    }
  }

  modalClick(evento) {

    this.eventosService.setEventoSeleccionado(evento);
    this.modal = true
    this.appState.setModal(true)

  }
  comprobarComentarios(evento) {

    this.datosService.getComentariosByEvento(evento) //comprueba si un evento tiene comentarios
      .then((results) => {
        if (results.length > 0) {
          let arrayComentarios = results;
          console.log(evento.ID, " tiene este array de comentarios", results)

          evento.nota = 0
          for (const comentario of arrayComentarios) { //el reduce no estaba funcionando por alguna razons , asi que a lo bulce
            evento.nota += comentario.valoracion
          }
          evento.nota = evento.nota / arrayComentarios.length
          evento.valoraciones = this.convertirNumeroAEstrellas(evento.nota)


        }
      })
      .catch((err) => { console.log(err) })



    // llamas a base de datos y que lo mire y ya le mando a la vista al html lo que sea con ngIf
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

  convertirNumeroAEstrellas(numero) {
    let stringEstrellas = ""
    for (let i = 0; i < numero; i++) { stringEstrellas += this.icono + " " }
    if (numero - parseInt(numero) > 0.25) stringEstrellas += this.medioicono;
    return stringEstrellas;
  }

  async ordenarPor() {
    console.log(this.ordenar)


    switch (this.ordenar) {
      case "ABC":
        console.log("abc")

        this.arrayEventos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
        break;

      case "SCORE":
        console.log("score")
        this.arrayEventos.sort(function (a, b) { return b.nota - a.nota })

        break;

      case "VIEWS":

        this.arrayEventos.sort(function (a, b) { return b.visitas - a.visitas })

        break;
    }

    this.actualizarEventosVisibles()
    this.paginaActual = 1


  }

}




