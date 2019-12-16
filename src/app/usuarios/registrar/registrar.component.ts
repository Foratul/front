import { Component, OnInit } from '@angular/core';
import { datosBackService } from 'src/app/services/datosBack.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  formulario: FormGroup;

  constructor(private dataService: datosBackService) {

    this.formulario = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2)]
      ),

      email: new FormControl('', Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)),
      password: new FormControl('', Validators.required),
      repite_password: new FormControl('', Validators.required)
    }, [this.passwordValidator])
  }

  ngOnInit() {
  }


  onSubmit() {




    console.log("vamos a mandar", this.formulario.value)
    let mensaje = { mensaje: "No se ha registrado ", exito: false }

    this.dataService.registrarUsuario({ username: this.formulario.value.username, email: this.formulario.value.email, password: this.formulario.value.password })
      .then((result) => {
        console.log(result)
        if (result['exito']) mensaje = { mensaje: "Usuario registrado con exito , responda el mensaje de confirmación para activar su cuenta", exito: true }
        if (result['username_existente']) mensaje.mensaje += " Nombre de usuario no disponible "
        if (result['email_existente']) mensaje.mensaje += " No es posible registrarse con ese email "

      })
      .catch((error) => {
        mensaje.mensaje = "Ha habido un error de conexión al registrarse. Inténtelo más tarde"

        console.log(error)
      })
      .finally(() => { this.afterSubmit(mensaje) })
  }

  afterSubmit(mensaje, exit = false) {
    alert(mensaje.mensaje)
    if (mensaje.exito) $("#exampleModalCenter .close").click().click()

  }

  passwordValidator(form: FormGroup) {
    const passwordControl = form.controls['password']
    const repitepasswordControl = form.controls['repite_password']

    if (passwordControl.value == repitepasswordControl.value) {
      return null
    }
    else return { errorPasswordValidator: true, mensaje: "los passwords difieren" };


  }
}
