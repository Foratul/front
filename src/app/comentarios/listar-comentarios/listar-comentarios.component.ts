import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/appstate.service';
import { ComentarioService } from 'src/app/comentario.service';
import { datosBackService } from 'src/app/services/datosBack.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

declare let funcionesComunes

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
})
export class ListarComentariosComponent implements OnInit {
  app: any;
  arrayComentarios: any


  icono = "<i class='orange fas fa-star'</i>"
  medioicono = "<i class='orange fas fa-star-half'</i>"
  constructor(
    private appState: AppStateService,
    private comentarioService: ComentarioService,
    private datosService: datosBackService
  ) { }

  avatar = ["https://www.pngkey.com/png/detail/308-3081138_contact-avatar-generic.png"]

  ngOnInit() {
    this.app = this.appState.getAppState()
    this.arrayComentarios = this.app.arrayComentarios
    this.enlazarEventoAutorYComentario()
  }

  enlazarEventoAutorYComentario() {
    for (const comentario of this.arrayComentarios) {

      console.log()

      // comentario.fecha = comentario.fecha.moment().format('D MMM, YYYY')

      this.datosService.getEventoByID(comentario.eventoID)
        .then((evento) => {
          comentario.eventoNombre = evento['nombre']
          console.log(evento['lugar'])
          comentario.tipoEvento = (evento['lugar']) ? "sitio" : "evento"
        }
        ).catch((err) => {
          console.log(err)
          if (err.errorLogin) alert("Solo los usuarios registrados tienen acceso")
        })
      comentario.estrellas = funcionesComunes.convertirNumeroAEstrellas(comentario.valoracion)
      comentario.autor = "Invitado"
      if (comentario.usuarioID) {
        this.datosService.getUsuarioByID(comentario.usuarioID)
          .then((results) => {
            console.log(results[0])
            comentario.autor = results[0].username
            comentario.avatar = results[0].avatar
            console.log(this.avatar[comentario.avatar])
          })
          .catch(err => {
            console.log(err)

            if (err.errorLogin) alert("Solo los usuarios registrados pueden acceder")
          })
      }
    }

  }



  eventoClicado() { }


  drop($event) {
    moveItemInArray(this.arrayComentarios, $event.previousIndex, $event.currentIndex);
  }

}
