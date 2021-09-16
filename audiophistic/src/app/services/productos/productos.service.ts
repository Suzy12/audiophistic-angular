import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")});

  constructor(private http: HttpClient) { }

  public consultar_productos = () => {
    return this.http.get(this.api_url + '/productos', { headers: this.headers, observe: 'response' })
  }

  public consultar_un_producto = (id_producto:any) => {
    return this.http.get(this.api_url +'/productos/'+id_producto, { observe: 'response' })
  }

  public eliminar_un_producto = (id_producto:any) => {
    return this.http.get(this.api_url +'/eliminar_producto/'+id_producto, { headers: this.headers, observe: 'response' })
  }

  public consultar_productos_creador = (id_creador:any) => {
    return this.http.get(this.api_url +'/productos_por_creador/'+id_creador, { headers: this.headers, observe: 'response' })
  }

  public consultar_estilos_producto = (id_producto:any) => {
    return this.http.get(this.api_url +'/estilos/'+id_producto, { observe: 'response' })
  }
}
