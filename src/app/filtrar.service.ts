import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrarService {

  constructor() { }

  filtrarPorCampo(arrayEntrada, categoria = "Salamanca") {
    console.log("entra filto", categoria)
    let resultado = arrayEntrada.filter((item) => {

      return (item.address.district['@id'].toLowerCase()
        .includes(categoria.trim().toLowerCase()))

    })

    console.log("sale filtro", resultado)

    return resultado
  }



}
