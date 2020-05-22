import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStateService } from './appstate.service';

@Injectable({
  providedIn: 'root'
})
export class datosBackService {
  app
  constructor(private http: HttpClient,
    private appState: AppStateService) {


  }

  corsPrefix: string = "https://cors-anywhere.herokuapp.com/"
  // url: string = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json"


  urlApi = !(this.appState.getAppState().localhost) ? "http://localhost:3000/api/" : "https://proyectoneoland.herokuapp.com/api/"

  getDistritosLayer(): Promise<any> {
    let url = "./assets/Distritos_de_Madrid.geojson"
    return this.http.get(url).toPromise()


  }

  getAllEventos(): Promise<any> {
    let prom = this.http.get(this.urlApi + "eventos").toPromise()
    return prom
  }

  getBarrios() {
    let url = "./assets/madrid-barrios.json"
    return this.http.get(url).toPromise()

  }


  enviarComentario(comentario) {
    console.log("datos service envia comentario")
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

  getUsuarios() {
    return this.http.get(this.urlApi + "usuarios/").toPromise()

  }

  getComentarioByID(ID): Promise<any> {
    return this.http.get(this.urlApi + "comentarios/?ID=" + ID).toPromise()
  }

  getComentarioByEventoID(ID): Promise<any> {
    return this.http.get(this.urlApi + "comentarios/?EventoID=" + ID).toPromise()
  }

  getEventoByID(ID) {
    console.log("getEventoByID en el service")

    return this.http.get(this.urlApi + "eventos/?ID=" + ID).toPromise()

  }

  getEventosByAnyFields(objeto): Promise<any> {
    console.log(this.urlApi)


    return this.http.post(this.urlApi + "eventos/buscador", objeto).toPromise()

  }

  getUsuarioByID(ID) {
    console.log("getUsuarioByID en el service")


    return this.http.get(this.urlApi + "usuarios/?ID=" + ID).toPromise()

  }

  getEventosComentarios(): any {

    return this.http.get(this.urlApi + "comentarios/tablaIndices/").toPromise()
  }
  getEventosMetodoOR(string) { return this.http.get(this.urlApi + "eventos/?AnyField=" + string).toPromise() }

  hacerGeocoding(direccion) {

    return this.http.get("https://maps.google.com/maps/api/geocode/json?" + direccion + "&key=AIzaSyB9CobDD06h6vgzmUpmoKIpCgSXc43B7B0").toPromise()
  }

  reenviarMail(objeto) { return this.http.post(this.urlApi + "usuarios/reenviarMail", objeto).toPromise() }
}


