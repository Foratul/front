import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limiteTexto'
})
export class LimiteTextoPipe implements PipeTransform {

  transform(texto: String, ...args: any[]): string {

    return (texto) ? texto.slice(0, args[0]) + "..." : "Sin información"


  }

}
