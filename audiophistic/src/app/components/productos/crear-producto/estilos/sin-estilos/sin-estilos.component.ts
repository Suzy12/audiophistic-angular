import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sin-estilos',
  templateUrl: './sin-estilos.component.html',
  styleUrls: ['./sin-estilos.component.css', '../../crear-producto.component.css']
})
export class SinEstilosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  leer_imagen = (evento:any) => {
    this.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      console.log(imagen_base64);
    });
  }

  procesar_imagen = (archivo_imagen: any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evento) => {
      resolve(evento.target!.result)
    }
    if (archivo_imagen) {
      reader.readAsDataURL(archivo_imagen);
    }
  });

}
