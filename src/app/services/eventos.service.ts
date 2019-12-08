import { Injectable } from '@angular/core';
import { datosBackService } from './datosBack.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  arrayEventos: any

  constructor(private datosBackService: datosBackService) {
    this.arrayEventos = []
  }


  getEventos() {
    let prom = new Promise((resolve, reject) => {
      this.datosBackService.getEventos()
        .then((datos) => {
          this.arrayEventos = datos
          resolve(datos)
        })
        .catch((error) => { reject(error) })

    })
    return prom;
  }

  getEventosVista() { return this.arrayEventos }

}
