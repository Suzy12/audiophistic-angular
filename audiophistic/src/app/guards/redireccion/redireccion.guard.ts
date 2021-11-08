import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';

@Injectable({
  providedIn: 'root'
})
export class RedireccionGuard implements CanActivate {
  constructor(private router: Router, private acceso_service: AccesoService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const roles_permitidos = route.data.roles_permitidos;
    const redirectTo = route.data.redirectTo;
    const rol_almacenado = route.data.rol_almacenado;

    if (await this.validar_acceso(roles_permitidos, rol_almacenado)) {
      return true;
    } else {
      this.router.navigate([redirectTo], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  async validar_acceso(roles_permitidos: Array<string>, rol_almacenado: string) {
    const rol_actual: string = localStorage.getItem(rol_almacenado) || '';
    if (!roles_permitidos.includes(rol_actual)) {
      return false;
    }
    return await this.acceso_service.tiene_permisos();
  }

}
