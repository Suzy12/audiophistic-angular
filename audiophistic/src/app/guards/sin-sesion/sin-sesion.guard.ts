import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class SinSesionGuard implements CanActivate {

  constructor(private acceso_service: AccesoService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.acceso_service.esta_autenticado()) {
      this.router.navigate(["inicio/dashboard"]);
      return false;
    } else {
      localStorage.removeItem('token');
      return true;
    }
  }

}
