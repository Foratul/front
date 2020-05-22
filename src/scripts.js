


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

    reemplazarAcentos(cadena) {
        var chars = {
            "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u",
            "à": "a", "è": "e", "ì": "i", "ò": "o", "ù": "u",
            "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U",
            "À": "A", "È": "E", "Ì": "I", "Ò": "O", "Ù": "U"
        }
        let expr = /[áàéèíìóòúù]/ig;
        let res = cadena.replace(expr, function (e) { return chars[e] });
        return res;
    }



}