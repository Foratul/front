import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-listar-eventos',
  templateUrl: './listar-eventos.component.html',
  styleUrls: ['./listar-eventos.component.css']
})
export class ListarEventosComponent implements OnInit {
  arrayEventos = []
  porPagina: number = 20;
  paginaActual: number = 1
  arrayEventosVisibles: Array<any>
  paginasTotales: number;

  constructor(private eventosService: EventosService) { }

  ngOnInit() {

    this.arrayEventos = this.aleatorizarArray(this.eventosService.getEventosVista())
    this.paginasTotales = Math.floor(this.arrayEventos.length / this.porPagina) + 1
    this.actualizarEventosVisibles()
  }

  drop($event) { moveItemInArray(this.arrayEventos, $event.previousIndex, $event.currentIndex); }

  botonPagina(avance) {
    this.paginaActual += avance
    if (this.paginaActual < 1) {
      this.paginaActual = 1
      return
    }
    if (this.paginaActual > this.paginasTotales) {
      this.paginaActual = this.paginasTotales
      return
    }
    this.actualizarEventosVisibles()
  }

  actualizarEventosVisibles() {
    this.arrayEventosVisibles = this.arrayEventos.filter((elemento, index) => {
      if (index >= ((this.paginaActual - 1) * this.porPagina) && index < (this.paginaActual * this.porPagina))
        return elemento
    })
    console.log(this.arrayEventosVisibles)
  }

  aleatorizarArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    } return array

  }
}

