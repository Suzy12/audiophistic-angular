import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../../models/Usuarios/usuario';
import { Idioma } from '../../../models/idioma'
import { UsuariosService } from '../../../services/usuarios/usuarios.service'
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['../../../../animaciones.css', './tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  usuarios: Usuario[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private usuarios_service: UsuariosService,
    private toastr: ToastrService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.iniciar_tabla();
    this.consultar_usuarios();
  }

  private iniciar_tabla() {
    this.dtOptions = {
      language: Idioma.spanish_datatables,
      pagingType: 'full_numbers',
      scrollX: true,
      pageLength: 10,
      responsive: true,
      processing: true,
    };
  }

  /*========= VER USUARIOS ========== */

  private consultar_usuarios() {
    this.usuarios_service.consultar_usuarios().subscribe((res: any) => {
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.usuarios = res.body.resultado;
        this.dtTrigger.next();
      }
    });
  }

  ver_usuario(tipo_usuario: any, id_usuario: any) {
    if (tipo_usuario == 3) {
      this.router.navigate(['/inicio/ver-usuario', id_usuario]);
    }
  }

  /* ============ ELIMINAR USUARIOS ============= */

  abrir_modal_eliminar(id_usuario: number, nombre_usuario: string) {
    const modalRef = this.modalService.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'usuario',
      mensaje: "Se eliminará el usuario " + nombre_usuario + 
      ". Si el usuario es un creador de contenido, se eliminarán los productos y blogs creados por dicho usuario.",
      id: id_usuario,
    }

    modalRef.componentInstance.datos_eliminar = datos;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}


