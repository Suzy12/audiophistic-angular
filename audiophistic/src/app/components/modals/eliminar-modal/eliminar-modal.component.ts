import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  @Input() datos_eliminar: any;
  cargando:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private usuarios_service: UsuariosService,
    private productos_service: ProductosService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  cerrar_modal() {
    this.activeModal.close();
    window.location.reload();
  }

  eliminar() {
    switch (this.datos_eliminar.eliminar) {
      case "usuario":
        this.eliminar_usuario()
        break;
      default:
        this.eliminar_producto()
    }
    this.cerrar_modal()
  }

  private eliminar_usuario() {
    this.usuarios_service.eliminar_un_usuario(this.datos_eliminar.id).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
      }
    });
  }

  private eliminar_producto() {
    this.cargando = true;
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "1":
        this.eliminar_producto_administrador()
        break;
      case "2":
        this.eliminar_producto_creador()
        break;
      default:
        this.toastr.error("No tiene permisos para eliminar", 'Error', { timeOut: 5000 });
        break;
    }

  }

  private eliminar_producto_creador() {
    this.productos_service.eliminar_un_producto_creador(this.datos_eliminar.id).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando = false;
      } else {
        this.cargando = false;
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
      }
    });
  }

  private eliminar_producto_administrador() {
    this.productos_service.eliminar_un_producto(this.datos_eliminar.id).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando = false;
      } else {
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
        this.cargando = false;
      }
    });
  }

}