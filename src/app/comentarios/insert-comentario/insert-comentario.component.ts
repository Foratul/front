import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { PeticionesDatosService } from 'src/app/peticiones-datos.service';

@Component({
  selector: 'app-insert-comentario',
  templateUrl: './insert-comentario.component.html',
  styleUrls: ['./insert-comentario.component.css']
})
export class InsertComentarioComponent implements OnInit {

  constructor(private dataService: PeticionesDatosService) { }

  ngOnInit() {
  }


  onSubmit(formulario) {

    let mensaje = "No se pudo agregar el comentario, inténtelo más tarde"
    this.dataService.enviarComentario(formulario)
      .then((result) => {

        console.log(result)
        if (result['exito']) mensaje = "Comentario insertado con éxito, gracias por su opinión"
        if (result['loginError']) mensaje = "Necesitas estar logueado para esto"
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => { this.afterSubmit(mensaje) })

  }

  afterSubmit(mensaje) { alert(mensaje) }
}
