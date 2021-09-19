import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-presentaciones',
  templateUrl: './presentaciones.component.html',
  styleUrls: ['./presentaciones.component.css', '../../crear-producto.component.css']
})
export class PresentacionesComponent implements OnInit {

  @Input() submitted: boolean = false;

  precio: string = ''

  presentaciones_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer,
    private estilos_service: EstilosService) { 
    }

  ngOnInit(): void {
    this.presentaciones_form = <FormGroup>this.controlContainer.control;
    console.log("hola",this.fotos(0).controls[0]);
  }

  get estilos(): FormArray { return this.presentaciones_form.get('estilos') as FormArray }

  fotos(i: number): FormArray { return this.estilos.controls[i].get('fotos') as FormArray }

  agregar_estilo() {
    this.estilos.push(this.estilos_service.crear_estilo_form());
  }

  agregar_foto(i: number) {
    this.fotos(i).push(this.estilos_service.nueva_caracteristica());
    console.log("hola",this.fotos(i));
  }

  eliminar_estilo(i: number) {
    this.estilos.removeAt(i);
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

  transformar_dinero(elemento: any) {
    this.precio = this.estilos_service.transformar_dinero(elemento)
  }



}
