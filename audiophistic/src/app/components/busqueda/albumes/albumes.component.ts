import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/Productos/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['../compartir.css', './albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  productos: Producto[] = []

  minValue: number = 100;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Mín.:</b> ₡' + value;
        case LabelType.High:
          return '<b>Máx.:</b> ₡' + value;
        default:
          return '₡' + value;
      }
    }
  };

  constructor(private productos_services: ProductosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productos_services.consultar_productos_por_tipo(1).subscribe(
      (res: any) => {
        this.toastr.clear();
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.productos = res.body.resultado;
          console.log(this.productos)
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    )
  }

}
