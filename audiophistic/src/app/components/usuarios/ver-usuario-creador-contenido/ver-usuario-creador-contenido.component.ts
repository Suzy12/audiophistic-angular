import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { Usuario_Creador_de_Contenido } from 'src/app/models/Usuarios/usuario_creador_contenido';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-ver-usuario-creador-contenido',
  templateUrl: './ver-usuario-creador-contenido.component.html',
  styleUrls: ['./ver-usuario-creador-contenido.component.css']
})
export class VerUsuarioCreadorContenidoComponent implements OnInit {

  slides = [0, 1, 2, 3, 4, 5];

  usuario: any = {
    caracteristicas: {}
  }
  caracteristicas:any= []

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_usuario_creador_contenido(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          console.log(res.body.resultado)
          this.usuario = res.body.resultado as Usuario
          this.crear_caracteristicas_usuario()
        }
      })
    })
  }

  ngOnInit(): void {
  }

  crear_caracteristicas_usuario() {
    let usuario_consumidor = this.usuario.caracteristicas as Usuario_Creador_de_Contenido
    let caracteristicas = [
      {
        caracteristica: 'Teléfono',
        valor: usuario_consumidor.celular
      },
      {
        caracteristica: 'Dirección Exacta',
        valor: usuario_consumidor.direccion_exacta
      },
      {
        caracteristica: 'Sitio Web',
        valor: usuario_consumidor.sitio_web
      }
    ];
    this.caracteristicas = caracteristicas
  }

}
