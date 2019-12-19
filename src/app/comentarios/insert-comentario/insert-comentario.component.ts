import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { datosBackService } from 'src/app/services/datosBack.service';
import { AppStateService } from 'src/app/services/appstate.service';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
declare let $;
declare let funcionesComunes

@Component({
  selector: 'app-insert-comentario',
  templateUrl: './insert-comentario.component.html',
  styleUrls: ['./insert-comentario.component.css']
})
export class InsertComentarioComponent implements OnInit, OnDestroy {
  exito
  evento
  app
  arrayEstrellas = []
  @Output() comentarioExitoso: EventEmitter<boolean>

  constructor(
    private dataService: datosBackService,
    private appState: AppStateService,
    private activatedRoute: ActivatedRoute,
    private eventosService: EventosService
  ) {



    this.comentarioExitoso = new EventEmitter<boolean>()

  }
  icono = 'far fa-star'
  medioicono = 'fas fa-star-half'
  n = 0;
  recomendable = false
  alerta

  ngOnDestroy() {

    console.log("insert comentario destruido")


  }

  ngOnInit() {


    $(".alert").hide()



    this.evento = this.eventosService.getEventoSeleccionado()

    // alert("TENGO evento" + this.evento.nombre)

    for (let i = 0; i < 5; i++) {
      this.arrayEstrellas.push({ icono: this.icono })
    }
    this.app = this.appState.getAppState()
    // this.activatedRoute.params.subscribe((params) => { this.evento.ID = params })
  }

  estrellaClicada(n) {
    this.n = n + 1;
    console.log("se ha clicado en " + n)
    for (let i = 0; i < this.arrayEstrellas.length; i++) {
      if (i <= n) this.arrayEstrellas[i].active = true, this.arrayEstrellas[i].icono = 'fas fa-star'
      else this.arrayEstrellas[i].active = false, this.arrayEstrellas[i].icono = 'far fa-star'

    }
  }

  onSubmit(formulario) {
    formulario.valoracion = this.n
    formulario.recomendable = this.recomendable;
    console.log("vamos a mandar", formulario)
    let mensaje = "No se pudo agregar el comentario, inténtelo más tarde"
    this.dataService.enviarComentario(formulario)
      .then((result) => {
        console.log(result)
        if (result['exito']) {
          mensaje = "Comentario insertado con éxito, gracias por su opinión"
          console.log(this.evento.votantes, this.evento.nota)
          this.evento.votantes = (this.evento.votantes) ? this.evento.votantes + 1 : 1
          this.evento.nota = (this.evento.nota) ? this.evento.nota + this.n : this.n
          let numero = this.evento.nota / this.evento.votantes

          console.log(numero)
          this.evento.valoraciones = funcionesComunes.convertirNumeroAEstrellas(numero)

          this.exito = true
        }
        if (result['loginError']) mensaje = "Necesitas estar logueado para esto"
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => { this.afterSubmit(mensaje) })

  }

  thumbsClick() {

    this.recomendable = !this.recomendable;


  }

  afterSubmit(mensaje) {

    this.alerta = mensaje
    $(".alert").show()


    if (this.exito) {

      $(".alert").removeClass("alert-warning").addClass("alert-success")
      $(".formulario").hide()
      setTimeout(() => {
        // $("#modalHeader .close").click().click()
        this.comentarioExitoso.emit(true)
        this.dataService.getComentarioByEventoID(this.evento.ID)
          .then((results) => { this.app.arrayComentarios = results })
          .catch((error) => { console.log(error) })

      }, 2000)
      this.appState.setComentarioExitoso(true)




    }

    // if (this.exito) $("#modal .close").hide()












    // }


  }
}

