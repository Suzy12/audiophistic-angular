import { Component, OnInit, ViewChildren, ViewChild, NgModule } from '@angular/core';
import Stepper from 'bs-stepper';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

import { AlbumesComponent } from './productos/albumes/albumes.component';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  private stepper: Stepper = {} as Stepper;
  tipo_producto: number = 1;
  estilo:string = '';
  
  /*@ViewChild(AlbumesComponent) albumViewChild: AlbumesComponent = new AlbumesComponent;*/

  constructor(private estilos_service: EstilosService) { 
    this.consultar_estilos()
  }

  /*getChildrenProperty() {
    console.log(this.albumViewChild.album_object);
  }*/

  consultar_estilos(){
    this.estilo = this.estilos_service.consultar_estilo_producto(this.tipo_producto);
    console.log(this.estilo)
  }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper1") as HTMLElement, {
      linear: false,
      animation: true
    })
  }

}
