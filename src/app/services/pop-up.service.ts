import { Injectable } from '@angular/core';
declare let $


@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  texto: string;



  constructor() {

    function setMyPosition() {
      console.log("Entramos")

    }



  }


  addPopUp(elemento: any, special = false) {
    let desc = (elemento.descripcion) ? elemento.descripcion : ""
    let url = (elemento.link) ? `<a href="${elemento.link}" target="blank">madrid.es <i class="fas fa-external-link-alt"></i></a>` : ""
    this.texto = ""
    this.texto += `<h5 class="customPopup"><strong>${elemento.nombre}</strong></h5>`
    this.texto += `<div>${desc}</div>`
    this.texto += "<div>" + url + "</div>";

    this.texto += `<div class="customPopup" id = "popUpText"> </div>`
    console.log(elemento)
    this.texto += `<button data-ID=${elemento.ID} data-arrayIndex=${elemento.arrayIndex} data-elemento=${elemento} (click)="ampliarInformacion()" class="customPopup" id="infoPopUp"><i class="fas fa-info"></i></button>`
    this.texto += `<button data-lat=${elemento.latitude} data-lng=${elemento.longitude} (click)="rutaHere()" class="customPopup" id="rutaPopUp">Ruta hasta aquí</button>`

    return this.texto
  }



}