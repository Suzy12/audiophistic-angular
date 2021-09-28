import { Component, Injectable, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['../../../../animaciones.css','./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {

  @Input() datos_eliminar: any;
  public isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrir_cerrar(){
    this.isCollapsed = !this.isCollapsed;
  }

  cerrar(){
    this.isCollapsed = false;
  }


}
