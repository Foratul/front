import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../services/appstate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showBox: Boolean = true;
  app: any;


  constructor(private appStateService: AppStateService) { }

  ngOnInit() {
    this.appStateService.setMostrarMapa(false);
  }

  navegarAMapa() {
    this.app = this.appStateService.getAppState();
    this.app.mostrarAplicacion = true;
    this.app.mostrarMapa = true;
    this.app.extenderHeader = false;
  }

}
