import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioImpuesto'
})
export class PrecioImpuestoPipe implements PipeTransform {

  transform(precio: number): number {
    return precio * 0.13;
  }

}
