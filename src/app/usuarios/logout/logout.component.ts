import { Component, OnInit } from '@angular/core';
import { AppStateService } from 'src/app/services/appstate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private appState: AppStateService, private router: Router) { }

  ngOnInit() {

    this.appState.setLogueado(false)
    localStorage.removeItem("token")
    alert(`el usuario ${this.appState.getUser()} ha cerrado sesión`)
    this.appState.setUser(null)

  }

}
