import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/Productos/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-audifonos',
  templateUrl: './audifonos.component.html',
  styleUrls: ['../compartir.css', './audifonos.component.css']
})
export class AudifonosComponent implements OnInit {

  productos: Producto[] = []

  constructor(private productos_services: ProductosService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.productos_services.consultar_productos_por_tipo(2).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

}