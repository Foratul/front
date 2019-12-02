import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  desplegado = false
  title = 'project';

  cargando = true;
  constructor() { }

  menuclicado() {
    console.log("menuclicado")
    this.desplegado = !this.desplegado


  }

  ngOnInit() {
  }

}
