import { Component, OnInit, Query } from '@angular/core';
import { datosBackService } from '../services/datosBack.service';
import { EventosService } from '../services/eventos.service';
import { AppStateService } from '../services/appstate.service';
import { MarkerService } from '../services/marker.service';
import { sharedStylesheetJitUrl } from '@angular/compiler';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  buscarPorDistrito = false
  arrayDistritos = []
  distrito = "CENTRO"
  app
  results
  formulario
  data: any
  constructor(
    private datosBack: datosBackService, private eventoService: EventosService, private markerService: MarkerService, private appState: AppStateService,
    private router: Router) {
    this.app = this.appState.getAppState()

    this.formulario = new FormGroup({
      nombre: new FormControl(this.app.busquedaSimple, [
        // Validators.required,
        // Validators.minLength(2)
      ]
      ),
      codigoPostal: new FormControl(null, [Validators.minLength(5), Validators.maxLength(5)]),
      distrito: new FormControl(null)
    })
  }

  ngOnInit() {
    console.log(this.app)
    this.results = {}


    $(".modal-content").css("height", "80vh")

    this.datosBack.getBarrios()
      .then((result) => {
        result['data'].forEach(element => {
          if (!this.arrayDistritos.includes(element.distrito_nombre)) this.arrayDistritos.push(element.distrito_nombre)
        });
      })
      .catch((error) => { console.log(error) })

  }
  toggleBuscarPorDistrito() { this.buscarPorDistrito = !this.buscarPorDistrito }

  onSubmit() {
    this.data = this.formulario.value

    this.results = {}

    console.log("me ha llegado", this.data)
    let query = ""
    let valor
    for (let key in this.data) {
      valor = this.data[key];
      if (key != 'distrito' && key != 'codigoPostal') query += `UPPER (${key}) like '%${valor.trim().toUpperCase()}%' AND `
    }
    query += "TRUE"
    //esta mierda era mas sencila con los formularios simples
    if (this.data.codigoPostal) query += `AND (UPPER (codigoPostal) like '%${this.data.codigoPostal.trim().toUpperCase()}' OR UPPER (direccionGeocoding) like '%${this.data.codigoPostal.toUpperCase().trim()}%') `
    if (this.data.distrito) query += ` AND (UPPER (distrito) like '%${this.data.distrito.trim().toUpperCase()}' OR UPPER (barrioScrap) like '%${this.data.distrito.toUpperCase().trim()}%') `

    console.log("voy a mandar estar query", query)

    // let objetoQuery = [{ field: "nombre", valor: formulario.nombre.toUpperCase() }]

    // if (this.buscarPorDistrito) objetoQuery.push({ field: "(distrito OR barrioScrap)", valor: formulario.distrito.toUpperCase().trim() })

    this.datosBack.getEventosByAnyFields({ query })
      .then((results) => {
        // if (results.length > 0) {
        this.app.cargando = true;
        this.eventoService.setEventosSeleccionados(results)
        this.eventoService.setEventosDescargados(results)

        this.results = { existen: true, contenido: results }
        console.log("El server me devuelve un array de ", results.length)
        // this.eventoService.setEventosDescargados(results)
        this.markerService.addMarkers(this.app.map, results, 1000000)
        this.app.cargando = false;
        this.router.navigate(['/vacio'])
        this.router.navigate(['/listarEventos'])
        $("#modalHeader .close").click().click()
        this.app.modal.Buscador = false

        // }

      })
      .catch((error) => { console.log(error) })
    this.buscarPorDistrito = false
  }
}







