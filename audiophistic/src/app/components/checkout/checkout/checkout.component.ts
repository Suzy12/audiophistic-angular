import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarritoLocalService } from 'src/app/services/carrito/carrito-local/carrito-local.service';
import { CarritoService } from 'src/app/services/carrito/carrito/carrito.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../compartir.css', './checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  pagina_actual: number = 1;

  carrito: any = []
  precio_subtotal: number = 0
  precio_envio: number = 2500;

  constructor(private carrito_local_service: CarritoLocalService,
    private carrito_service: CarritoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carrito_service.carrito().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          console.log(res.body.resultado)
          this.carrito = res.body.resultado.items
          this.precio_subtotal = this.carrito_local_service.precio_total
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

  recibir_mensaje($event: any) {
    this.pagina_actual = $event
  }

  cambiar_pagina(pagina: number) {
    this.pagina_actual = pagina
  }

}
