import { Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { CarritoService } from '../carrito/carrito.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoLocalService {

  carrito_resumen: any = []
  precio_total: number = 0
  carrito_actualizado: Subject<boolean> = new Subject<boolean>();

  constructor(private carrito_service: CarritoService, private toastr: ToastrService) {
    this.carrito_actualizado.subscribe((value) => {
      this.carrito_resumen = []
    });

  }

  consultar_carrito_resumen() {
    this.carrito_service.carrito_resumen().subscribe((res: any) => {
      this.toastr.clear();
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.carrito_resumen = res.body.resultado;
        console.log(this.carrito_resumen)
        this.calcular_precio_total_carrito()
        this.carrito_cambios()
      }
    });
  }

  eliminar_del_carrito(producto_info: any) {

    this.carrito_service.eliminar_del_carrito(producto_info).subscribe((res: any) => {
      this.toastr.clear();
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        location.reload();
      }
    });
  }

  cambiar_cantidad_carrito(producto_info: any) {
    console.log(producto_info)
    this.carrito_service.cambiar_cantidad_del_carrito(producto_info).subscribe((res: any) => {
      this.toastr.clear();
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        console.log(res.body.resultado)
        this.toastr.success(res.body.resultado, 'Exito', { timeOut: 5000 });
        this.consultar_carrito_resumen()

      }
    });
  }

  carrito_cambios() {
    this.carrito_actualizado.next(this.carrito_resumen);
  }

  calcular_precio_total_carrito() {
    this.carrito_resumen.items.forEach((producto: any) => {
      if (producto.cantidad == -1) {
        this.precio_total += producto.precio
      } else {
        this.precio_total += (producto.precio * producto.cantidad)
      }
    });

  }

}
