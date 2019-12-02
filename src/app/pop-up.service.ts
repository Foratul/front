import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }


  addPopUp(data: any): string {

    return `<div>${data}<div>`
  }
}
