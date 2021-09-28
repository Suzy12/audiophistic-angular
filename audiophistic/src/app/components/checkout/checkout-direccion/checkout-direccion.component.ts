import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-direccion',
  templateUrl: './checkout-direccion.component.html',
  styleUrls: ['../compartir.css','./checkout-direccion.component.css']
})
export class CheckoutDireccionComponent implements OnInit {

  @Output() mensaje_padre = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  siguiente() {
    this.mensaje_padre.emit(2)
  }

}
