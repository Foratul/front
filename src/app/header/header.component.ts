import { Component, OnInit, Input } from '@angular/core';
import 'jquery'
import 'popper.js'
import 'bootstrap'
import { AppStateService } from '../appstate.service';
declare let $




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  app: any
  constructor(private appStateService: AppStateService) {

  }

  ngOnInit() {
    this.app = this.appStateService.setAppState

    $(document).ready(function () {
      $('.dropdown-toggle').dropdown()
    });
  }

  panelIzquierdo() {

    this.app.menu_desplegado = !this.app.menu_desplegado


  }

}
