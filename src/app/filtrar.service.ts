import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrarService {



  // RENDIMIENTO

  //me he traido 3000 resultados, tengo una funsion que te calcula la distancia entre tu posicion y un radio

  //que es mas eficiente, que se encargue el front en decidir que elementos va a mostrar de los que ya le han llegado o volver a hacer NUEVAS consultas a la base de datos cada vez que necesite un filtro . la funcion trigonometrica se tiene que ejecutar si o si.
  //el renderizado es lo lento, no el filtrado de arrays

  //propagasion de eventos se va de las manos???

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
