import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-pago',
  templateUrl: './checkout-pago.component.html',
  styleUrls: ['../compartir.css', './checkout-pago.component.css']
})
export class CheckoutPagoComponent implements OnInit {

  metodo_pago: string = 'pago_1';

  @Output() mensaje_padre = new EventEmitter<number>();

  constructor() { }


  ngOnInit(): void {
  }

  cambiar_pago(evt: any) {
    this.metodo_pago = evt
  }

  anterior() {
    this.mensaje_padre.emit(1)
  }

}
