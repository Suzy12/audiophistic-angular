import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioCantidad'
})
export class PrecioCantidadPipe implements PipeTransform {

  transform(precio: number, cantidad: number): number {
    if(cantidad == -1){
      return precio
    }
    return precio * cantidad;
  }

}
