import { Component, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { increment, decrement, reset } from '../counter.actions';

declare let funcionesComunes

@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {



  cadena: String = "BBBCCAAAD"
  resultado

  count$: Observable<number>;



  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {

    alert(funcionesComunes.reemplazarAcentos("TETUÁN"))



    this.resultado = contarLetrasConsecutivas(this.cadena)

    function contarLetrasConsecutivas(cadena) {
      let arrayLetras = cadena.split("")
      let repes = 1;
      let salidaParcial = ""
      for (let j = 0; j < arrayLetras.length; j++) {
        let letraActual = arrayLetras[j]
        let letraSiguiente = (j < arrayLetras.length - 1) ? arrayLetras[j + 1] : null
        if (letraSiguiente && letraActual == letraSiguiente) repes++
        else {
          salidaParcial += repes + letraActual
          repes = 1
        }
      }
      return salidaParcial

    }

  }
  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

}