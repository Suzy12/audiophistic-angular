import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/Usuarios/usuario';
import { Usuario_Consumidor } from 'src/app/models/Usuarios/usuario_consumidor';

@Component({
  selector: 'app-ver-usuario-consumidor',
  templateUrl: './ver-usuario-consumidor.component.html',
  styleUrls: ['../../../../animaciones.css', './ver-usuario-consumidor.component.css']
})
export class VerUsuarioConsumidorComponent implements OnInit {

  usuario: Usuario = {
    correo: '',
    id_usuario: 0,
    nombre: '',
    caracteristicas: {
      nombre_tipo: '',
      id_tipo: 0
    }
  }

  caracteristicas:any= []

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_un_usuario(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.usuario = res.body.resultado
          this.crear_caracteristicas_usuario(this.usuario)
        }
      })
    })
  }

  ngOnInit(): void {
  }

  crear_caracteristicas_usuario(usuario: Usuario) {
    let usuario_consumidor = usuario.caracteristicas as Usuario_Consumidor
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
        caracteristica: 'Correo',
        valor: usuario.correo
      },
      {
        caracteristica: 'Cumpleaños',
        valor: usuario_consumidor.cumpleanos
      },
    ];
    this.caracteristicas = caracteristicas
  }


}
