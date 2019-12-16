import { Component, OnInit, Input } from '@angular/core';
import { AppStateService } from '../services/appstate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() arrayItems: any
  @Input() app: any;
  constructor(private appStateService: AppStateService) { }

  ngOnInit() {


  }

  cerrarMenu() {
    this.app.menu_desplegado = false
    this.app.paginaDesplegable = "MENU"
  }

  modal() {


    console.log("click en modal")
    let elemento = document.getElementById("modalid");
    elemento.classList.toggle("activa");



  }
}
