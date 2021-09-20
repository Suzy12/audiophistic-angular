import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective, ControlContainer } from '@angular/forms'

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css', '../../crear-usuario.component.css']
})
export class CreadorContenidoComponent implements OnInit {

  @Input() submitted: boolean = false;

  creador_contenido_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.creador_contenido_form = <FormGroup>this.controlContainer.control;
  }

  get form() { return this.creador_contenido_form.controls }

  get form_caracteristicas() { return (this.creador_contenido_form.get('caracteristicas') as FormGroup).controls }

}
