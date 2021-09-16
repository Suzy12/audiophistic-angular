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
    this.leer_token();
  }

  public iniciar_sesion = (sesion_info: Object) => {
    return this.http.post(this.api_url + '/iniciar_sesion', sesion_info, { observe: 'response' })
  }

  public registrarse = (registro_info: Object) => {
    return this.http.post(this.api_url + '/registrar_usuario', registro_info, { observe: 'response' })
  }

  public activar_cuenta = (token_: string) => {
    return this.http.post(this.api_url + '/confirmar_usuario', { token: token_ }, { observe: 'response' })
  }

  public recuperar_contrasena = (recuperar_info: Object) => {
    return this.http.post(this.api_url + '/recuperar_contrasena', recuperar_info, { observe: 'response' })
  }

  public validar_token = (validar_info: Object) => {
    return this.http.post(this.api_url + '/validar_tipo_token', validar_info, { observe: 'response' })
  }


  cerrar_sesion() {
    this.logger.next(false);
    localStorage.clear()
  }

  confirmar_iniciar_sesion(correo: string, token: string, rol: string) {
    this.logger.next(true);
    this.guardar_token(token);
    this.guardar_correo(correo);
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

  leer_token() {
    let token: string | null = '';
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }
    return token;
  }

  leer_rol() {
    let rol: string | null = '';
    if (localStorage.getItem('rol')) {
      rol = localStorage.getItem('rol');
    }
    return rol;
  }

  async tiene_permisos() {
    let token_ = this.leer_token();
    let rol_ = this.leer_rol();
    if (token_ == '' || rol_ == '') {
      return false;
    } else {
      let validar_info = { token: token_, id_tipo: rol_ }
      var res:any = await this.validar_token(validar_info).toPromise();
      console.log(res.body);
      if (res.body.error) {
        return false;
      } else {
        return true;
      }
    }
  }

  esta_autenticado(): boolean {
    let token_ = this.leer_token();
    if(token_ == ''){
      return false;
    }
    return true;
  }

  tiene_sesion(): Observable<boolean> {
    return this.logger.asObservable();
  }

}