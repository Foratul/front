import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private http: HttpClient) { }

  dibujarBarrios(): Observable<any> {
    let url = "./assets/madrid-districts.geojson"
    let urlremota = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/madrid-districts.geojson"

    return this.http.get(url);
  }
}

