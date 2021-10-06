import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { CarritoService } from 'src/app/services/carrito/carrito/carrito.service';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['../../../../animaciones.css', './ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {

  carrito: any = {}
  precio_subtotal: number = 0;
  precio_envio: number = 2500;

  constructor(private carrito_service: CarritoService, private toastr: ToastrService,
    private carrito_local_service: CarritoLocalService) { }

  ngOnInit(): void {
    this.carrito_service.carrito().subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        console.log(res.body.resultado)
        this.carrito = res.body.resultado
        this.precio_subtotal = this.carrito_local_service.precio_total
      }
    })
  }

  agregar(producto: any, i:number) {
    let cantidad = producto.cantidad;
    if (cantidad < producto.existencia)
      this.carrito.items[i].cantidad = cantidad + 1;
      let producto_info = {
        id_producto: producto.id_producto,
        id_estilo: producto.id_estilo,
        cantidad: cantidad + 1
      }
      this.carrito_local_service.cambiar_cantidad_carrito(producto_info)
  }
  quitar(producto: any, i:number) {
    let cantidad = producto.cantidad;
    if (cantidad != 1) {
      this.carrito.items[i].cantidad = cantidad - 1;
      let producto_info = {
        id_producto: producto.id_producto,
        id_estilo: producto.id_estilo,
        cantidad: cantidad - 1
      }
      this.carrito_local_service.cambiar_cantidad_carrito(producto_info)
    }
  }

  eliminar_item(i: number) {
    let producto_info = this.carrito.items[i];
    producto_info = {
      id_producto: producto_info.id_producto,
      id_estilo: producto_info.id_estilo
    }
    this.carrito_local_service.eliminar_del_carrito(producto_info)

  }


}
