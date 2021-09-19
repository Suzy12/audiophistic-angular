import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

/*
Los estilos están definidos por el tipo de producto

1 - Albumes 
2 - Audifonos 
3 - Parlantes 

*/


export class EstilosService {

  estilos = [
    {
      estilo: 'presentaciones',
      producto: [1]
    },
    {
      estilo: 'colores',
      producto: [2]
    },
    {
      estilo: 'sin_estilo',
      producto: [3]
    }
  ];

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) { }

  consultar_estilo_producto(id_tipo_producto: any) {
    let estilo_producto: string = '';
    this.estilos.forEach(elemento => {
      if (elemento.producto.includes(id_tipo_producto)) {
        estilo_producto = elemento.estilo
        console.log(estilo_producto)
        return;
      }
    });
    return estilo_producto;
  }

  crear_estilo_form(): FormGroup {
    return this.fb.group({
      existencia: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      fotos: this.fb.array([this.fb.control(['', [Validators.required]])]),
    })
  }

  nueva_caracteristica(): FormControl {
    return this.fb.control('');
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

  transformar_dinero(elemento: any) {
    return this.currencyPipe.transform(elemento.target.value, '₡') as string;
  }
}
