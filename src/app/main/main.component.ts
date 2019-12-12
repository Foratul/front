import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import 'jquery'
import { AppStateService } from '../services/appstate.service';
declare let $ //esto no lo quites, que lo necesitan luego


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'project';
  app: any;

  arrayItems: any = []
  constructor(
    private markerService: MarkerService,
    private appStateService: AppStateService) { }
  menuclicado() {
    console.log("menuclicado")
    this.arrayItems = this.markerService.returnVisibles()
    console.log(this.arrayItems)
    this.app.menu_desplegado = !this.app.menu_desplegado


  }

  ngOnInit() {


    // this.appStateService.setMostrarMapa(false)
    this.app = this.appStateService.getAppState()

  }

}
