import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioImpuesto'
})
export class PrecioImpuestoPipe implements PipeTransform {

  transform(precio: number, envio:number): number {
    return (precio + envio) * 0.13;
  }

}
