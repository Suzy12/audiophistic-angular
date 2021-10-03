import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective, ControlContainer } from '@angular/forms'
import { EstilosService } from 'src/app/services/builders/estilos/estilos.service';
import { convertCompilerOptionsFromJson } from 'typescript';

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css', '../../crear-usuario.component.css']
})
export class CreadorContenidoComponent implements OnInit {

  @Input() enviado: boolean = false;

  creador_contenido_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer, private estilos_service: EstilosService) { }

  ngOnInit(): void {
    this.creador_contenido_form = <FormGroup>this.controlContainer.control;
  }

  get form() { return this.creador_contenido_form.controls }

  get form_caracteristicas() { return (this.creador_contenido_form.get('caracteristicas') as FormGroup).controls }

  leer_imagen = (evento: any) => {
    this.estilos_service.procesar_imagen(evento.target.files[0]).then((imagen_base64: any) => {
      let f = this.form_caracteristicas.imagen
      f.patchValue(imagen_base64, { emitModelToViewChange: false })
    });
  }

  obtener_imagen() {
    return this.form_caracteristicas.imagen.value;
  }

}
