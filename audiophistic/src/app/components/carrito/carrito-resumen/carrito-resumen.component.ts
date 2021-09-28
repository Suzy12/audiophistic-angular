import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito-resumen',
  templateUrl: './carrito-resumen.component.html',
  styleUrls: ['./carrito-resumen.component.css']
})
export class CarritoResumenComponent implements OnInit {

  public isCollapsed = true;

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
