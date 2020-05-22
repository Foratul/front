import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import 'jquery'
import 'jquery-ui'
declare let funcionesComunes
import { AppStateService } from '../services/appstate.service';
import { datosBackService } from '../services/datosBack.service';
import { EventosService } from '../services/eventos.service';
declare let $ //esto no lo quites, que lo necesitan luego


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'project';
  app: any;
  datosCargados = false;

  arrayItems: any = []
  constructor(
    private markerService: MarkerService,
    private appStateService: AppStateService,
    private datosBack: datosBackService, private eventosService: EventosService) { }
  menuclicado() {
    console.log("menuclicado")
    // this.arrayItems = this.markerService.returnVisibles()
    // console.log(this.arrayItems)
    // this.app.menu_desplegado = !this.app.menu_desplegado
    // this.app.pagina = "HOME"

  }

  comentarioExitoso() { }

  ngOnInit() {







    // $('.mobile').resizable({
    //   handles: 'n,w,s,e',
    //   minWidth: 200,
    //   maxWidth: 400
    // });


    // this.appStateService.setMostrarMapa(false)
    this.app = this.appStateService.getAppState()
    this.app.cargando = true;
    this.datosBack.getAllEventos().then((results) => {
      this.eventosService.setEventosSeleccionados(results)
      this.datosCargados = true
    })


  }

}
