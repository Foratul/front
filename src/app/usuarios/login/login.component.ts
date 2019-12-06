import { Component, OnInit } from '@angular/core';
import { PeticionesDatosService } from 'src/app/peticiones-datos.service';
import { AppStateService } from 'src/app/appstate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: PeticionesDatosService,
    private appStateService: AppStateService) {
  }

  ngOnInit() {
  }

  onSubmit(formulario) {
    let exito

    this.dataService.loginUsuario(formulario)
      .then((result) => {
        exito = result['exito']
        localStorage.setItem("token", result['token'])
        this.appStateService.setLogueado(true)
      })
      .catch((error) => {
        exito = false
      })

      .finally(() => { this.afterSubmit(exito) })

  }

  afterSubmit(exito) {
    alert((exito) ? "Logueado con exito" : "Usuario y/o contraseña incorrectos")
  }
}
