import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/Productos/productos';
import { Producto_Albumes } from 'src/app/models/Productos/producto_albumes';
import { Producto_Audifonos } from 'src/app/models/Productos/producto_audifonos';

@Injectable({
  providedIn: 'root'
})

/*
Las especificaciones están definidas según el tipo de producto

1 - Albumes 
2 - Audifonos 
3 - Parlantes 

*/

export class EspecificacionesProductoService {

  constructor() { }

  crear_especificaciones_producto(producto:Producto):any[]{
    switch(producto.caracteristicas.id_tipo){
      case 1:
        return this.crear_especificaciones_album(producto)
      case 2:
        return this.crear_especificaciones_audifonos(producto)
      default:
        return [];
    }

  }

  crear_especificaciones_album(producto: Producto):any[] {
    let producto_album: Producto_Albumes = producto.caracteristicas
    let especificaciones = [
      {
        especificacion: 'Artista',
        valor: producto_album.artista
      },
      {
        especificacion: 'Tíltulo',
        valor: producto.titulo
      },
      {
        especificacion: 'Género Musical',
        valor: producto_album.generos
      },
      {
        especificacion: 'Año de lanzamiento',
        valor: producto.fecha_lanzamiento
      },
    ];
    return especificaciones;
  }

  crear_especificaciones_audifonos(producto: Producto):any[] {
    let producto_audifonos: Producto_Audifonos = producto.caracteristicas
    let especificaciones = [
      {
        especificacion: 'Marca',
        valor: producto_audifonos.marca
      },
      {
        especificacion: 'Tipo',
        valor: producto_audifonos.tipo
      },
      {
        especificacion: 'Conexión',
        valor: producto_audifonos.conexion
      },
      {
        especificacion: 'Año de lanzamiento',
        valor: producto.fecha_lanzamiento
      },
    ];
    return especificaciones;
  }



}
