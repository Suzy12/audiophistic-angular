import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")});

  constructor(private http: HttpClient) { }

  public consultar_usuarios = () => {
    return this.http.get(this.api_url + '/usuarios', { headers: this.headers, observe: 'response' })
  }

  public consultar_un_usuario = (id_usuario:any) => {
    return this.http.get(this.api_url + '/usuarios/'+id_usuario, { headers: this.headers, observe: 'response' })
  }

  public eliminar_un_usuario = (id_usuario:any) => {
    return this.http.get(this.api_url + '/eliminar_usuario/'+id_usuario, { headers: this.headers, observe: 'response' })
  }

}
