import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { AppStateService } from '../services/appstate.service';

@Component({
  selector: 'app-vacio',
  templateUrl: './vacio.component.html',
  styleUrls: ['./vacio.component.css']
})
export class VacioComponent implements OnInit {


  constructor(private appState: AppStateService) { }

  ngOnInit() {

    this.appState.setMostrarMapa(true)
    this.appState.setHistorial("/map")




  }






}

