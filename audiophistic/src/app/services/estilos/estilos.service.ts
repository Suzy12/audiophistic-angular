import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*
Los estilos están definidos por el tipo de producto

1 - Albumes 
2 - Audifonos 
3 - Parlantes 

*/


export class EstilosService {

  estilos = [
    {
      estilo: 'presentaciones',
      producto: [1]
    },
    {
      estilo: 'colores',
      producto: [2]
    },
    {
      estilo: 'sin_estilo',
      producto: [3]
    }
  ];

  constructor() { }

  consultar_estilo_producto(id_tipo_producto: any){
    let estilo_producto:string = '';
    this.estilos.forEach(elemento => {
        if (elemento.producto.includes(id_tipo_producto)) {
          estilo_producto = elemento.estilo
          return;
        }
    });
    return estilo_producto;
  }
}
