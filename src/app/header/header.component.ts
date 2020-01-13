import { Component, OnInit, Input } from '@angular/core';
import 'jquery'
import 'popper.js'
import 'bootstrap'
import { AppStateService } from '../services/appstate.service';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { datosBackService } from '../services/datosBack.service';
import { EventosService } from '../services/eventos.service';
import { Router } from '@angular/router';
import { MarkerService } from '../services/marker.service';

declare let $



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  app: any
  buscadorActivo
  busquedaSimple
  modalActivo = 0

  constructor(
    private appStateService: AppStateService,
    private datosBack: datosBackService,
    private eventosService: EventosService, private router: Router,
    private markerService: MarkerService) {
  }

  afterViewInit() {
    $("#arrastrable").data({ left: $("#arrastrable").css('left'), top: $("#arrastrable").css('top') })

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
        $("#modal .close").click()
        setTimeout(() => {
          this.desactivarComponentes()
          this.resetArrastrado()
        }, 100)




      })

    $('.close').click(() => {
      this.desactivarComponentes()

    });
  }
  buscadorClick() {
    this.modalActivo = 2;

    this.app.modal.Register = false;
    this.app.modal.Buscador = true
    this.app.modal.Login = false;
    $('#modalSpan').text('Buscador');
    $('#modalSpanSecundario').text('');

  }

  buscadorSimple() {
    this.datosBack.getEventosMetodoOR(this.busquedaSimple).then((results) => {
      console.log("me ha llegado un array con", results['length'])
      if (results[0]) results[0].centrar = true

      this.eventosService.setEventosDescargados(results)
      this.markerService.addMarkers(this.app.map, results, 1000000)
      this.app.cargando = false;
      this.router.navigate(['/vacio']).then(() => { this.router.navigate(['/eventos']) })
    }


    )
  }


  loginClick() {
    this.modalActivo = 0;

    this.app.modal.Register = false;
    this.app.modal.Buscador = false;
    this.app.modal.Login = true
    $('#modalSpan').text('Login');
    $('#modalSpanSecundario').text('Registro');



  }



  logoutClick() {
    this.app.modal.Logout = true
    $('#modalSpan').text('Logout');

  }

  registerClick() {
    this.modalActivo = 1;
    this.app.modal.Register = true;
    this.app.modal.Buscador = false;
    this.app.modal.Login = false;
    console.log("registerClick")
    $('#modalSpan').text('Registro');
    $('#modalSpanSecundario').text('Login');


  }


  panelIzquierdo() {

    this.app.menu_desplegado = !this.app.menu_desplegado


  }

  mostrarMapa() {

    this.appStateService.setMostrarMapa(true)
  }

  menuHeader() {
    this.appStateService.setExtenderHeader(!this.appStateService.getExtenderHeader())
    this.app.mostrarAplicacion = !this.app.extenderHeader
  }


  navegarAMapa() {


    this.app.mostrarAplicacion = true

    this.app.mostrarMapa = true
    this.app.extenderHeader = false
  }
  resetArrastrado() {



    $("#arrastrable").css('transform', 'translate3d(0px, 0px, 0px)');



  }

  navegar(pagina) {
    this.app.paginaMain = pagina
    this.app.extenderHeader = false
    this.app.mostrarAplicacion = true
    this.app.mostrarMapa = false
    console.log("app.mainPagina vale", this.app.paginaMain)


  }

  escribiendoEnBuscadorHeader() {
    // console.log("escriben en el header search")
    // this.app.modal.Buscador = true
    // // $(".buscadorHeader").addClass("active")
    // $('#modalHeader').modal("show")
    // $('.modal-dialog').addClass("modal-fs")
    // $('#modalSpan').text('Busquemos');

  }

  desactivarComponentes() {

    for (const clave in this.app.modal) {

      setTimeout(() => {
        this.app.modal[clave] = false;
      }, 100)


    }

  }

  actualizarBotonera() {
    alert("clck en actulizar botonera")
    this.app.map.mostrarMarkers = !this.app.map.mostrarMarkers
    this.appStateService.actualizaBotonera()
  }
}

