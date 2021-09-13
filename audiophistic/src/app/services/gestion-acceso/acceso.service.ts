import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private api_url = environment.api_url;
  private logger = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.logger.next(false);
    this.leerToken();
  }

  public iniciar_sesion = (sesion_info: Object) => {
    return this.http.post(this.api_url + '/iniciar_sesion', sesion_info, { observe: 'response' })
  }

  cerrar_sesion() {
    this.logger.next(false);
    localStorage.clear()
  }

  confirmar_iniciar_sesion(correo: string, token: string, rol: string) {
    this.logger.next(true);
    this.guardar_token(correo);
    this.guardar_correo(token);
    this.guardar_rol(rol)
  }

  private guardar_correo(correo: string) {
    localStorage.setItem('correo', correo);
  }

  private guardar_token(token: string) {
    localStorage.setItem('token', token);
  }

  private guardar_rol(rol: string) {
    localStorage.setItem('rol', rol);
  }

  leerToken() {
    let token: string | null = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    return token;
  }

  esta_autenticado(): boolean {
    return true;
  }

  tiene_sesion(): Observable<boolean> {
    return this.logger.asObservable();
  }

}
