import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private api_url = environment.api_url;
  private headers = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });

  constructor(private http: HttpClient) { }

  public consultar_productos_sin_blogs = () => {
    return this.http.get(this.api_url + '/mis_productos_sin_blog', { headers: this.headers, observe: 'response' })
  }
}
