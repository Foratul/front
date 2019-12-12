import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { datosBackService } from 'src/app/services/datosBack.service';
import { AppStateService } from 'src/app/services/appstate.service';
import { ActivatedRoute } from '@angular/router';
import { EventosService } from 'src/app/services/eventos.service';
declare let $;

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
  constructor(
    private dataService: datosBackService,
    private appState: AppStateService,
    private activatedRoute: ActivatedRoute,
    private eventosService: EventosService
  ) { }
  icono = 'far fa-star'
  medioicono = 'fas fa-star-half'
  n = 0;
  recomendable = false

  ngOnDestroy() {
    alert("componente insertcomentario destruido")


  }

  ngOnInit() {


    this.evento = this.eventosService.getEventoSeleccionado()

    alert("TENGO evento" + this.evento.nombre)

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
    alert(mensaje)
    if (this.exito) $("#exampleModalCenter .close").click().click()
    // if (this.exito) $("#modal .close").hide()



    // }


  }
}

