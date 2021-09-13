import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.component.html',
  styleUrls: ['./creador-contenido.component.css','../../crear-usuario.component.css']
})
export class CreadorContenidoComponent implements OnInit {

  usuario_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuario_form = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sitio_web: ['']
    });
  }

}
