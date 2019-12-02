import { Component, OnInit, Input } from '@angular/core';
import { MarkerService } from 'src/app/marker.service';
import { LayerService } from 'src/app/layer.service';
import { PeticionesDatosService } from 'src/app/peticiones-datos.service';
import { FiltrarService } from 'src/app/filtrar.service';
import { RutasService } from 'src/app/rutas.service';

@Component({
  selector: 'app-botonera',
  templateUrl: './botonera.component.html',
  styleUrls: ['./botonera.component.css']
})
export class BotoneraComponent implements OnInit {

  @Input() map
  textobarrios = "OCULTAR BARRIOS"
  datosGlobales = []
  distritos = []




  constructor(private markerService: MarkerService,
    private layerService: LayerService,
    private peticionesDatosService: PeticionesDatosService,
    private filtrarService: FiltrarService,
    private rutasService: RutasService) { }

  ngOnInit() {
    this.peticionesDatosService.getBarrios()
      .then((result) => {
        result.data.forEach(element => {
          if (!this.distritos.includes(element.distrito_nombre)) this.distritos.push(element.distrito_nombre)
        });
      })
      .catch((error) => { console.log(error) })
  }

  onSubmit(formulario) {
    //limpio MAPA
    this.markerService.removeMarkers(this.map)
    //ME TRAIGO LOS RESULTADOS FILTRADOS
    let datosfiltrados = this.filtrarService.filtrarPorCampo(this.datosGlobales, formulario.value.selector)
    //LOS DIBUJO
    this.markerService.addMarkers(this.map, datosfiltrados);
  }

  limpiarMapa() {
    this.limpiarRutas()
    this.limpiarMarkers()
  }

  toggleBarrios() {
    this.textobarrios = (this.textobarrios == "OCULTAR BARRIOS") ? "MOSTRAR BARRIOS" : "OCULTAR BARRIOS"

    this.layerService.toggleBarrios(this.map)
  }

  limpiarRutas() { this.rutasService.limpiarRutas(this.map) }
  limpiarMarkers() { this.markerService.removeMarkers(this.map) }

  modoRutas() {
    // enrutando desactiva el barrios hightlith

    this.map.enrutando = !this.map.enrutando
  }

}
