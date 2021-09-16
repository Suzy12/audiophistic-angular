import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormGroupDirective } from '@angular/forms'

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css','../../crear-usuario.component.css']
})
export class CreadorContenidoComponent implements OnInit {

  @Input() creador_form: string = '';
  creador_contenido_form: FormGroup = {} as FormGroup;
  submitted:boolean = false;

  constructor(private fb: FormBuilder, private form_raiz: FormGroupDirective) { }

  ngOnInit(): void {
    this.creador_contenido_form = this.form_raiz.control.get(this.creador_form) as FormGroup;

    this.creador_contenido_form = this.fb.group({
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sitio_web: ['']
    });
  }

  get form() { return this.creador_contenido_form.controls }

}
