import { Injectable } from '@angular/core';
import { datosBackService } from './datosBack.service';
import { AppStateService } from './appstate.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  eventoSeleccionado
  arrayEventosCercanos = []
  arrayEventosSeleccionados = []
  arrayEventosDescargados = []

  constructor(
    private datosBackService: datosBackService,
  ) {
  }


  getAllEventos() {
    this.datosBackService.getAllEventos()
      .then((datos) => { this.arrayEventosDescargados = datos })
      .catch((error) => { console.log(error) })

  }


  getEventosSeleccionados() { return this.arrayEventosSeleccionados }
  setEventosSeleccionados(arrayEventos) { this.arrayEventosSeleccionados = arrayEventos }


  setEventosCercanos(arrayEventos) { this.arrayEventosCercanos = arrayEventos }
  getEventosCercanos() { return this.arrayEventosCercanos }
  getEventosDescargados() {
    return this.arrayEventosDescargados
  }
  setEventosDescargados(arrayEventos) {
    this.arrayEventosDescargados = arrayEventos;
  }
  getEventoSeleccionado() {
    return this.eventoSeleccionado
  }
  setEventoSeleccionado(evento) {
    this.eventoSeleccionado = evento;
  }
}




