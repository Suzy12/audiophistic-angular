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
    const rol_almacenado = route.data.rol_almacenado;

    console.log(this.validate_access(roles_permitidos, rol_almacenado));

    if (this.validate_access(roles_permitidos, rol_almacenado)) {
      return true;
    }

    this.router.navigate([redirectTo], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
  validate_access(roles_permitidos:Array<string>, rol_almacenado:string) {
    const rol_actual = localStorage.getItem(rol_almacenado)
    console.log("Rol: "+ localStorage.getItem("rol"))
    console.log("Rol: "+ localStorage.getItem("rol"))
    return (rol_actual) ? (roles_permitidos.includes(rol_actual)) : false;
  }

}
