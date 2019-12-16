import { Component, OnInit, Input } from '@angular/core';
import 'jquery'
import 'popper.js'
import 'bootstrap'
import { AppStateService } from '../services/appstate.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

declare let $



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  modalLogin = false;
  modalLogout = false;
  modalRegister = false
  app: any
  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.app = this.appStateService.getAppState()

    $(document).ready(function () {
      $('.dropdown-toggle').dropdown()
    });

    $('#modalHeader')
      .on('shown.bs.modal', () => {
        $('#myInput').trigger('focus')
      })
      .on('hidden.bs.modal', () => {
        this.modalLogin = false
        this.modalLogout = false
        this.modalRegister = false


        $("#modal .close").click()
        this.modalLogin = false
        this.modalLogout = false
        this.modalRegister = false




      })

    $('.close').click(() => {
      this.modalLogin = false
      this.modalLogout = false
      this.modalRegister = false


    });

  }

  loginClick() {
    this.modalLogin = true

  }

  logoutClick() {
    this.modalLogout = true
  }

  registerClick() {
    console.log("registerClick")

    this.modalRegister = true
  }


  panelIzquierdo() {

    this.app.menu_desplegado = !this.app.menu_desplegado


  }

  mostrarMapa() {

    this.appStateService.setMostrarMapa(true)
  }

  menuHeader() {
    this.appStateService.setMostrarAplicacion(!this.appStateService.getMostrarAplicacion)
    this.appStateService.setExtenderHeader(!this.appStateService.getExtenderHeader())
  }


  navegarAMapa() {



    this.appStateService.setMostrarMapa(!this.appStateService.getMostrarMapa())
  }


  navegar(pagina) {
    this.app.paginaMain = pagina
    this.app.mostrarMapa = false
    console.log("app.mainPagina vale", this.app.paginaMain)


  }

  escribiendoEnBuscadorHeader() { console.log("escriben en el header search") }
}
