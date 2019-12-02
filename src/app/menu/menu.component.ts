import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  arrayItems = ["elemento 1", "elemento cualquiera", "elemento otro", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array", "elemento otro por array"]

  constructor() { }

  ngOnInit() {
  }

  modal() {
    console.log("click en modal")
    let elemento = document.getElementById("modalid");
    elemento.classList.toggle("activa");



  }
}
