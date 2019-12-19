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


  addPopUp(elemento: any, special = false): string {
    let desc = (elemento.descripcion) ? elemento.descripcion : ""
    let url = (elemento.link) ? `<a href="${elemento.link}">madrid.es <i class="fas fa-external-link-alt"></i></a>` : ""
    this.texto = ""
    this.texto += `<h5 class="customPopup"><strong>${elemento.nombre}</strong></h5>`
    this.texto += `<div>${desc}</div>`
    this.texto += "<div>" + url + "</div>";


    this.texto += `<div class="customPopup" id = "popUpText"> </div>`

    this.texto += `<button data-ID=${elemento.ID} data-arrayIndex=${elemento.arrayIndex} (click)="hacerCosas()" class="customPopup" id="infoPopUp">Ver ficha</button>`

    return this.texto
  }

  hacerCosas() { }


  generarMenu($event, nombreMenu = "ACCIONES") { // ME SACAS UN MENU{
    console.dir("CLICK DERECHO FUNCION " + $event.containerPoint)
    // estoy usando una mezcla de jQuery y JS, por eso originalEvent
    let x = $event.originalEvent.clientX
    let y = $event.originalEvent.clientY


    console.log(x, y)
    let generatedMenu = document.createElement("div")
    generatedMenu.innerHTML = `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
${nombreMenu}    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="enlace dropdown-item">Buscar eventos cercanos</a>
      <a class="enlace dropdown-item">Trazar ruta hasta aquí</a>
      <a (mousenter)="setMyPosition()" (click)="setMyPosition()" class="enlace dropdown-item">Establecer como mi posición</a>
    </div>
  </div>`
    generatedMenu.style.position = "absolute"
    generatedMenu.style.left = x + "px"
    generatedMenu.style.top = y + "px"
    generatedMenu.style.zIndex = "9999"
    document.body.appendChild(generatedMenu);
    document.querySelector("#dropdownMenuButton").setAttribute("aria-expanded", "true")
    $(document).ready(function () {
      $('.dropdown-toggle').dropdown()
    });

    $('.dropdown-item').on('hover', () => { $('dropdown-item').addClass('active') }).on('mouseout', () => { $('dropdown-item').removeClass('active') })

  }

}