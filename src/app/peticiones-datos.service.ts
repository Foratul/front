import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeticionesDatosService {

  constructor(private http: HttpClient) { }

  corsPrefix: string = "https://cors-anywhere.herokuapp.com/"
  // url: string = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json"

  urlApi = "http://localhost:3000/api/"


  getDistritosLayer(): Promise<any> {
    let url = "./assets/Distritos_de_Madrid.geojson"
    return this.http.get(url).toPromise()


  }

  getEventos() {
    let prom = this.http.get(this.urlApi + "eventos").toPromise()
    return prom
  }

  getBarrios() {
    let url = "./assets/madrid-barrios.json"
    return this.http.get(url).toPromise()

  }

  enviarComentario(comentario) {
    return this.http.post(
      this.urlApi + "comentarios/add", comentario,
      { headers: new HttpHeaders({ token: localStorage.getItem("token") }) }
    )
      .toPromise()
  }

  registrarUsuario(usuario) {
    return this.http.post(this.urlApi + "usuarios/register", usuario).toPromise()
  }

  loginUsuario(usuario) {
    return this.http.post(this.urlApi + "usuarios/login", usuario).toPromise()

  }

}
