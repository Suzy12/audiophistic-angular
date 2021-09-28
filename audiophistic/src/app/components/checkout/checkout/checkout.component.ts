import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['../compartir.css', './checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  pagina_actual: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  recibir_mensaje($event:any) {
    this.pagina_actual = $event
  }

  cambiar_pagina(pagina:number){
    this.pagina_actual = pagina
  }

}
