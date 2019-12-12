import { Component, OnInit } from '@angular/core';
import { datosBackService } from 'src/app/services/datosBack.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  arrayUsuarios: any
  constructor(private dataService: datosBackService) { }

  ngOnInit() {
    this.dataService.getUsuarios().then((results) => {
      this.arrayUsuarios = results
    })
      .catch((err) => { console.log(err) })






    // <label>Nombre</label>
    // <input type="text" class="form-control" name="username" ngModel>
    // <label>Email</label>
    // <input class="form-control" name="email" ngModel>
    // <label>Password</label>
    // <input type="text" class="form-control" name="password" ngModel>
    // <input type="submit" value="enviar" class="btn btn-block btn-primary">

  }


  onSubmit(formulario) {



    console.log("vamos a mandar", formulario)
    let mensaje = "No se ha registrado "

    this.dataService.registrarUsuario(formulario)
      .then((result) => {
        console.log(result)
        if (result['exito']) mensaje = "Usuario registrado con exito , responda el mensaje de confirmación para activar su cuenta"
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
