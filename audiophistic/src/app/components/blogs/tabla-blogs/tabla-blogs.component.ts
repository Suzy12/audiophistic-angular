import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Idioma } from 'src/app/models/idioma';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-tabla-blogs',
  templateUrl: './tabla-blogs.component.html',
  styleUrls: ['./tabla-blogs.component.css']
})
export class TablaBlogsComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  productos: any[] = [];
  dtTrigger: Subject < any > = new Subject<any>();
  rol: string = ''

  constructor(private http: HttpClient, private productos_service: ProductosService,
    private modal_service: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.rol = localStorage.getItem('rol') as string
      this.iniciar_tabla();
    this.consultar_productos();
  }
  
    private iniciar_tabla() {
    this.dtOptions = {
      language: Idioma.espanol_tablas,
      pagingType: 'full_numbers',
      scrollX: true,
      pageLength: 10,
      responsive: true,
      processing: true,
    };
  }


    /* =========== VER PRODUCTOS =============== */
  
    private consultar_productos() {
    let rol = localStorage.getItem("rol");
    switch (rol) {
      case "2":
        this.consultar_productos_creador(rol)
        break;
      default:
        this.consultar_todos_productos()
    }

  }
  
    private consultar_todos_productos() {
    this.productos_service.consultar_productos().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
          this.dtTrigger.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }
  
    private consultar_productos_creador(rol: string) {
    this.productos_service.consultar_mis_productos().subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
          this.dtTrigger.next();
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }

  ver_producto(id_producto: any) {
    this.router.navigate(['/ver-blog', id_producto]);
  }


  /* ============= MODIFICAR PRODUCTO =============== */

  modificar_producto(id_producto: any) {
    this.router.navigate(['/inicio/modificar-producto', { state: { id: id_producto } }]);
  }

  /* ============= ELIMINAR PRODUCTO =============== */

  abrir_modal_eliminar(id_blog: number, titulo_blog: string) {
    const modalRef = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'blog',
      mensaje: "Se eliminará el blog " + titulo_blog + ". Los productos asociados ya no tendrán una referencia a un blog.",
      id: id_blog,
    }

    modalRef.componentInstance.datos_eliminar = datos;
    modalRef.result.then((result) => {
      window.location.reload();
    }, (reason) => {
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}

