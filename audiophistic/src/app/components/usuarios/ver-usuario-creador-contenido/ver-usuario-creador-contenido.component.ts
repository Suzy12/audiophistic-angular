import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-ver-usuario-creador-contenido',
  templateUrl: './ver-usuario-creador-contenido.component.html',
  styleUrls: ['./ver-usuario-creador-contenido.component.css']
})
export class VerUsuarioCreadorContenidoComponent implements OnInit {

  slides = [0, 1, 2, 3, 4, 5];

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_un_usuario(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
