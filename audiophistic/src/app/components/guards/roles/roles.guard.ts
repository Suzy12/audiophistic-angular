import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) {
    const roles_permitidos = route.data.roles_permitidos;
    const redirectTo = route.data.redirectTo;
    const rol_almacenado = route.data.key;

    console.log(this.validateAccess(roles_permitidos, rol_almacenado));

    if (this.validateAccess(roles_permitidos, rol_almacenado)) {
      return true;
    }

    this.router.navigate([redirectTo], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  validateAccess(roles_permitidos:Array<string>, rol_almacenado:string) {
    const rol_actual = localStorage.get(rol_almacenado)
    return (rol_actual) ? (roles_permitidos.includes(rol_actual)) : false;
  }

}
