import { Component, OnInit } from '@angular/core';
import { datosBackService } from 'src/app/services/datosBack.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  constructor(private dataService: datosBackService) { }

  ngOnInit() {
  }


  onSubmit(formulario) {

    console.log("vamos a mandar", formulario)
    let mensaje = "No se ha registrado "

    this.dataService.registrarUsuario(formulario)
      .then((result) => {
        console.log(result)
        if (result['exito']) mensaje = "Usuario registrado con exito"
        if (result['username_existente']) mensaje = "Nombre de usuario no disponible "
        if (result['email_existente']) mensaje += "No es posible registrarse con ese email "
      })
      .catch((error) => {
        mensaje = "Ha habido un error al registrarse"
        console.log(error)
      })
      .finally(() => { this.afterSubmit(mensaje) })
  }

  afterSubmit(mensaje) { alert(mensaje) }
}
