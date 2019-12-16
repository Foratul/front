import { Injectable } from '@angular/core';
import { datosBackService } from './datosBack.service';
import { AppStateService } from './appstate.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  arrayEventos: any
  eventosCercanos
  eventoSeleccionado
  arrayEventosSeleccionados
  arrayEventosDescargados = []

  constructor(
    private datosBackService: datosBackService,
  ) {
    this.arrayEventos = []
  }


  getAllEventos() {
    this.datosBackService.getAllEventos()
      .then((datos) => { this.arrayEventos = datos })
      .catch((error) => { console.log(error) })

  }


  getEventosSeleccionados() { return this.arrayEventos }
  setEventosSeleccionados(arrayEventos) { this.arrayEventos = arrayEventos }


  setEventosCercanos(arrayEventos) { this.eventosCercanos = arrayEventos }
  getEventosCercanos() { return this.eventosCercanos }




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




