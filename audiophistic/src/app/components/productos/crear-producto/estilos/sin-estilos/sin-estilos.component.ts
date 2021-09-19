import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-sin-estilos',
  templateUrl: './sin-estilos.component.html',
  styleUrls: ['./sin-estilos.component.css', '../../crear-producto.component.css']
})
export class SinEstilosComponent implements OnInit {

  @Input() submitted: boolean = false;

  precio: string = ''

  sin_estilos_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer,
    private estilos_service: EstilosService) {
    this.sin_estilos_form = <FormGroup>this.controlContainer.control;
    this.estilos.controls[0].patchValue(
      {
        'precio': '0',
        'nombre': 'Sin estilo',
        'descripcion': 'Sin estilo',
      }
    );
  }

  ngOnInit(): void {
  }

  get estilos(): FormArray { return this.sin_estilos_form.get('estilos') as FormArray }

  fotos(i: number): FormArray { return this.estilos.controls[i].get('fotos') as FormArray }

  agregar_foto(i: number) {
    this.fotos(i).push(this.estilos_service.nueva_caracteristica());
  }
  eliminar_foto(i: number, j: number) {
    this.fotos(i).removeAt(j);
  }

  leer_imagen = (evento: any, i: number, j: number) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.fotos(i).at(j);
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }


}
