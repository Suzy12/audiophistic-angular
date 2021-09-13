import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccesoService } from 'src/app/services/gestion-acceso/acceso.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['../compartir-form.css', './iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  sesion_form: FormGroup = {} as FormGroup;
  submitted: Boolean = false;

  constructor(private formBuilder: FormBuilder, private acceso_service: AccesoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sesion_form = this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    });
  }

  get form() { return this.sesion_form.controls }

  iniciar_sesion() {
    let sesion_info = this.sesion_form.getRawValue();

    this.submitted = true;

    if (this.sesion_form.invalid) {return;}

    console.log(sesion_info)

    this.acceso_service.iniciar_sesion(sesion_info).subscribe((res: any) => {
      this.toastr.clear();
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(`Bienvenido`, 'Usuario autenticado', { timeOut: 2000 });
        //this.exito(res.body);
      }
    });

    this.submitted = false;
  }

  exito(res: any) {
    let sesion_info = this.sesion_form.getRawValue();
    //this.guard.setSession(res.body.token);
    /*localStorage.set('current-user', sesion_info.correo); //guardar correo del usuario actual
    this.storage.set('current-user-role', res.body.user.nivel_acceso); //guardar rol para fachada
    this.storage.set('current-user-role-name', res.body.user.nombre_rol); //guardar nombre del rol
    this.storage.set('current-user-role-bd', res.body.user.id_lider); //guardar rol como está en la BD
    this.storage.set('current-user-movimiento', loginInfo.idMovimiento); //guardar id del movimiento
    this.loginForm.reset();

    this.storage.set('current-user-notifications', 0);


    this.router.navigate(['/perfil']); //navegar a la pagina de perfil */
  }
}
