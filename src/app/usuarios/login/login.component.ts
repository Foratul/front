import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/appstate.service';
import { datosBackService } from 'src/app/services/datosBack.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: datosBackService,
    private appStateService: AppStateService) {
  }

  ngOnInit() {
    alert("carga app-login")
  }

  onSubmit(formulario) {
    let resultado

    this.dataService.loginUsuario(formulario)
      .then((result) => {
        resultado = result
      })
      .catch((error) => {
        resultado.exito = false
        resultado.mensaje = "No se puede conectar, intentelo más tarde"
        console.log(error)
      })

      .finally(() => { this.afterSubmit(resultado) })

  }

  afterSubmit(resultado) {
    if (resultado.exito) {
      localStorage.setItem("token", resultado.token)
      this.appStateService.setLogueado(true)
      this.appStateService.setUser({ username: resultado.user.username, ID: resultado.user.ID })

    }

    alert((resultado.exito) ? `Bienvenido de nuevo ${this.appStateService.getUser().username}, logueado con exito ` : `No se ha podido loguear ${resultado.mensaje}`)
    if (resultado.exito) $("#modalHeader .close").click().click()


  }


}
