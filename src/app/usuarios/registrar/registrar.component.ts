import { Component, OnInit } from '@angular/core';
import { datosBackService } from 'src/app/services/datosBack.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  formulario: FormGroup;
  alerta
  lastMail: string
  unactive = false;
  userID

  constructor(private dataService: datosBackService) {
    this.formulario = new FormGroup({
      username: new FormControl('',
        { validators: [Validators.required, Validators.minLength(2)] }
      ),
      email: new FormControl('', { validators: Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) }),
      password: new FormControl('', { validators: Validators.required }),
      repite_password: new FormControl('', Validators.required)
    }, [this.passwordValidator])
  }
  ngOnInit() {
    const usernameControl = this.formulario.controls['username'];
    usernameControl.valueChanges.pipe(debounceTime(500)).subscribe((valor) => { console.log(valor) })

    $(".alert").hide()
    $(document).ready(function () {
      $(".show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('.show_hide_password input').attr("type") == "text") {
          $('.show_hide_password input').attr('type', 'password');
          $('.show_hide_password i').addClass("fa-eye-slash");
          $('.show_hide_password i').removeClass("fa-eye");
        } else if ($('.show_hide_password input').attr("type") == "password") {
          $('.show_hide_password input').attr('type', 'text');
          $('.show_hide_password i').removeClass("fa-eye-slash");
          $('.show_hide_password i').addClass("fa-eye");
        }
      });
    });
  }
  onSubmit() {
    console.log("vamos a mandar", this.formulario.value)
    let mensaje = { mensaje: "No se ha registrado ", exito: false }
    this.dataService.registrarUsuario({ username: this.formulario.value.username, email: this.formulario.value.email, password: this.formulario.value.password })
      .then((result) => {
        this.unactive = result['unactive']
        this.userID = result['userID']
        console.log(result)
        if (result['exito']) mensaje = { mensaje: "Usuario registrado con exito , responda el mensaje de confirmación para activar su cuenta", exito: true }
        else mensaje = { mensaje: result['mensaje'], exito: false }
      })
      .catch((error) => {
        mensaje.mensaje = "Ha habido un error de conexión al registrarse. Inténtelo más tarde"

        console.log(error)
      })
      .finally(() => { this.afterSubmit(mensaje) })
  }

  afterSubmit(mensaje) {
    this.alerta = mensaje

    $(".alert").show()
    if (mensaje.exito) {
      $(".alert").removeClass("alert-warning").addClass("alert-success")
      $(".formulario").hide()
      setTimeout(() => { $("#modalHeader .close").click().click() }, 5000)
    }
  }

  passwordValidator(form: FormGroup) {
    const passwordControl = form.controls['password']
    const repitepasswordControl = form.controls['repite_password']

    if (passwordControl.value == repitepasswordControl.value) {
      return null
    }
    else return { errorPasswordValidator: true, mensaje: "los passwords difieren" };
  }

  reenviarActivacion() {
    this.lastMail = this.formulario.value.email
    this.dataService.reenviarMail({ email: this.lastMail, ID: this.userID }).then((result) => {
      this.unactive = false
      this.alerta = result
    })
  }
}
