import { Component, OnInit } from '@angular/core';
import { MarkerService } from '../marker.service';
import 'jquery'
import { AppStateService } from '../appstate.service';
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

    this.app = this.appStateService.getAppState()

  }

}
