import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  texto: string;
  constructor() { }


  addPopUp(elemento: any, special = false): string {

    this.texto = ""
    this.texto += `<div>${elemento.ID} ${elemento.nombre}  y ${elemento.descripcion}</div>`
    this.texto += `<div id="popUpText"></div>`
    this.texto += `<button data-ID=${elemento.ID} data-arrayIndex=${elemento.arrayIndex} id="infoPopUp">AMPLIAR INFORMACION</button>`

    return this.texto
  }


}
