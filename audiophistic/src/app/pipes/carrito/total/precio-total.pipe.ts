import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precioTotal'
})
export class PrecioTotalPipe implements PipeTransform {

  transform(precio: number, envio: number): number {
    return precio + envio;
  }
}
