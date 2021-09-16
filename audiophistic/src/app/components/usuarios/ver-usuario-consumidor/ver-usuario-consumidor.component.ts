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

  usuario:Usuario = {
    correo: '',
    id_usuario: 0,
    nombre: '',
    caracteristicas: {
      nombre: '',
      tipo: 0
    } as Usuario_Consumidor
  }

  constructor(private ruta_activated: ActivatedRoute, private usuarios_service: UsuariosService,
    private toastr: ToastrService) {
    this.ruta_activated.params.subscribe(params => {
      this.usuarios_service.consultar_un_usuario(params['id']).subscribe((res:any) => {
        console.log(res.body);
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.usuario = res.body.resultado
        }
      })
    })
  }

  ngOnInit(): void {
  }

}
