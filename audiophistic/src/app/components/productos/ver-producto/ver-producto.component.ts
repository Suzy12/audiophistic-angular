import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/Productos/productos';
import { Producto_Albumes } from 'src/app/models/Productos/producto_albumes';
import { EspecificacionesProductoService } from 'src/app/services/builders/especificaciones-producto/especificaciones-producto.service';
import { EstilosService } from 'src/app/services/builders/estilos/estilos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  producto: Producto = {
    id_creador: 0,
    titulo: '',
    id_producto: 0,
    nombre_creador: '',
    caracteristicas: {
      nombre_tipo: '',
      id_tipo: 0,
    }
  }
  nombre_estilo: string = ''
  estilos: any[] = []
  especificaciones: any[] = []
  imagenes: any[] = []
  precio: number = 0

  constructor(private ruta_activated: ActivatedRoute,
    private productos_service: ProductosService, private toastr: ToastrService,
    private estilos_service: EstilosService, private especificaciones_service: EspecificacionesProductoService) {
    this.ruta_activated.params.subscribe(params => {
      this.productos_service.consultar_un_producto(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.producto = res.body.resultado;
          this.consultar_estilos_producto();
          this.consultar_especificaciones_producto();
        }
      })
    })
  }

  ngOnInit(): void {
  }

  cambiar_atributos(estilo:any){
    this.cambiar_imagenes(estilo.fotos)
    this.cambiar_precio(estilo.precio)
  }

  cambiar_imagenes(fotos:any) {
    this.imagenes = fotos
  }

  cambiar_precio(precio:any){
    this.precio = this.producto.precio + precio
  }

  consultar_estilos_producto() {
    let nombre_estilo = this.estilos_service.consultar_estilo_producto(this.producto.caracteristicas.id_tipo);
    this.productos_service.consultar_estilos_producto(this.producto.id_producto).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
      } else {
        this.nombre_estilo = nombre_estilo;
        this.estilos = res.body.resultado;
        this.cambiar_atributos(this.estilos[this.estilos.length - 1])
      }
    })
  }

  consultar_especificaciones_producto() {
    this.especificaciones = this.especificaciones_service.crear_especificaciones_producto(this.producto);
  }

}
