import { Component, OnInit, Input } from '@angular/core';
import { AppStateService } from '../services/appstate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() arrayItems: any
  app: any;
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {

    this.app = this.appStateService.getAppState()

  }

  modal() {


    console.log("click en modal")
    let elemento = document.getElementById("modalid");
    elemento.classList.toggle("activa");



  }
}
