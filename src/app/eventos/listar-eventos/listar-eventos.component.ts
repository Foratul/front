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
  constructor(private eventosService: EventosService) { }

  ngOnInit() {

    this.arrayEventos = this.eventosService.getEventosVista()


  }

  drop($event) { moveItemInArray(this.arrayEventos, $event.previousIndex, $event.currentIndex); }


}
