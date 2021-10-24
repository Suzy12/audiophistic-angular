import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-busqueda-general',
  templateUrl: './busqueda-general.component.html',
  styleUrls: ['../../gestion-acceso/compartir-form.css', './busqueda-general.component.css']
})
export class BusquedaGeneralComponent implements OnInit {

  buscar_form: FormGroup = {} as FormGroup;
  enviado:boolean = false;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.buscar_form = this.formBuilder.group({
      termino: ['', [Validators.required]]
    });
  }

  get form() { return this.buscar_form.controls }

  buscar() {
    let recuperar_info = this.buscar_form.getRawValue();

    this.enviado = true;

    if (this.buscar_form.invalid) { return; }

    this.enviado = false;
  }

}
