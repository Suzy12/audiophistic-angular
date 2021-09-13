import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import Stepper from 'bs-stepper';
import { AlbumesComponent } from './productos/albumes/albumes.component';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  private stepper: Stepper = {} as Stepper;
  @ViewChild(AlbumesComponent) albumViewChild: AlbumesComponent = new AlbumesComponent;

  constructor() { }

  getChildrenProperty() {
    console.log(this.albumViewChild.album_object);
  }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
    this.getChildrenProperty()
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
