


let icono = "<i class='orange fas fa-star'</i>"
let medioicono = "<i class='orange fas fa-star-half'</i>"


let funcionesComunes = {

    convertirNumeroAEstrellas(numero) {


        console.log("a convertir numero a estrellas llega", numero)
        let stringEstrellas = ""
        for (let i = 0; i < Math.floor(numero); i++) { stringEstrellas += icono + " " }
        if (numero - Math.floor(numero) > 0.33) stringEstrellas += medioicono;

        console.log("sale", stringEstrellas)
        return stringEstrellas;
    }
    ,




}