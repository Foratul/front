import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from './services/appstate.service';

@Injectable({
  providedIn: 'root'
})



export class GuardiaGuard implements CanActivate, CanActivateChild, CanLoad {


  constructor(private router: Router,
    private appState: AppStateService) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = `/${next.routeConfig.path}`
    console.log("el guardia guarda " + url)
    this.appState.setHistorial(url)
    this.appState.setMostrarMapa(false)
    this.appState.setMostrarAplicacion(true)
    this.appState.setExtenderHeader(false)


    //oculta el mapa cada vez que navega a otro sitio
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    alert("can Load")

    if (!this.appState.getLogueado()) this.router.navigate(['/login'])

    return true;
  }
}
