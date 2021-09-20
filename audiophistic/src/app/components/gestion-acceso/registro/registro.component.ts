import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../compartir-form.css', './registro.component.css']
})
export class RegistroComponent implements OnInit {

  registro_form: FormGroup = {} as FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder, private acceso_service: AccesoService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.registro_form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  get form() { return this.registro_form.controls }

  registrarse() {
    let registro_info = this.registro_form.getRawValue();

    this.submitted = true;

    if (this.registro_form.invalid) { return; }

    this.acceso_service.registrarse(registro_info).subscribe((res: any) => {
      this.toastr.clear();
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(`Bienvenido`, 'Se envió un correo para activar su cuenta', { timeOut: 2000 });
      }
    });

    this.submitted = false;
  }

}
