import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesDatosService {

  constructor(private http: HttpClient) { }

  corsPrefix: string = "https://cors-anywhere.herokuapp.com/"
  url: string = "https://datos.madrid.es/egob/catalogo/206717-0-agenda-eventos-bibliotecas.json"


  getDistritosLayer(): Promise<any> {
    let url = "./assets/Distritos_de_Madrid.geojson"


    return this.http.get(url).toPromise()


  }

  getJson(): Promise<any> {
    console
    return this.http.get(this.corsPrefix + this.url).toPromise()


  }

  getBarrios(): Promise<any> {
    let url = "./assets/madrid-barrios.json"
    return this.http.get(url).toPromise()

  }


}
