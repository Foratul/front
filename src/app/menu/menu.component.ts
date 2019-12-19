import { Component, OnInit, Input } from '@angular/core';
import { AppStateService } from '../services/appstate.service';
import { EventosService } from '../services/eventos.service';
declare let $

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  app: any
  modal


  constructor(
    private eventosService: EventosService,
    private appStateService: AppStateService) { }

  ngOnInit() {
    this.app = this.appStateService.getAppState()
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


  }

  cerrarMenu() {
    console.log(this.app)

    if (this.app.paginaPrevia == "MENU") {
      this.app.menu_desplegado = false
      this.app.paginaDesplegable = "MENU"
    }
    else {
      this.app.paginaDesplegable = this.app.paginaPrevia
      this.app.paginaPrevia = "MENU"
    }
  }

  modalClick(evento) {

    this.eventosService.setEventoSeleccionado(evento);
    this.modal = true
    this.appStateService.setModal(true)

  }

}
