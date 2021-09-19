import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../../models/Productos/productos';
import { Idioma } from '../../../models/idioma'
import { ProductosService } from 'src/app/services/productos/productos.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};

  productos: Producto[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private productos_service: ProductosService,
    private modalService: NgbModal, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.iniciar_tabla();
    this.consultar_productos();
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


  /* =========== VER PRODUCTOS =============== */

  private consultar_productos(){
    let rol = localStorage.getItem("rol");
    switch(rol){
      case "2":
        this.consultar_productos_creador(rol)
        break;
      default:
        this.consultar_todos_productos()
    }

  }

  private consultar_todos_productos() {
    this.productos_service.consultar_productos().subscribe((res: any) => {
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.productos = res.body.resultado;
        this.dtTrigger.next();
      }
    });
  }

  private consultar_productos_creador(rol:string) {
    this.productos_service.consultar_mis_productos().subscribe((res: any) => {
      console.log(res.body);
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.productos = res.body.resultado;
        this.dtTrigger.next();
      }
    });
  }

  ver_producto(id_producto: any) {
    this.router.navigate(['/ver-producto', id_producto]);
  }

  /* ============= ELIMINAR PRODUCTO =============== */

  abrir_modal_eliminar(id_producto:number, titulo_producto:string) {
    const modalRef = this.modalService.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'producto',
      mensaje: "Se eliminará el producto "+titulo_producto,
      id: id_producto,
    }

    modalRef.componentInstance.datos_eliminar = datos;
    /*modalRef.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });*/
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
