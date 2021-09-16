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
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
      }
    });
  }

  private eliminar_producto() {
    this.productos_service.eliminar_un_producto(this.datos_eliminar.id).subscribe((res: any) => {
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
      }
    });
  }

}