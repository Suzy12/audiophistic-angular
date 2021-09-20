import { Component, OnInit, ViewChildren, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Producto_Albumes } from 'src/app/models/Productos/producto_albumes';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  producto_form: FormGroup = {} as FormGroup;
  submitted: boolean = false;
  cargando: boolean = false;
  sub_form_creado: boolean = false;
  modificar:boolean = false;

  private stepper: Stepper = {} as Stepper;
  tipo_producto: number = 1;
  estilo: string = '';

  constructor(private estilos_service: EstilosService, private productos_service: ProductosService,
    private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/productos'])
        }
      });
    this.producto_form = this.fb.group({
      estilos: this.fb.array([
        this.estilos_service.crear_estilo_form()
      ]),
      producto: this.fb.group({
        fecha_lanzamiento: ['', [Validators.required]],
        titulo: ['', [Validators.required]],
        precio: ['', [Validators.required]],
        tiempo_envio: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
      })
    });
    this.cambiar_configuracion()
  }

  cambiar_configuracion() {
    this.producto_form.reset()
    this.consultar_estilos()
    this.construir_form()
  }

  consultar_estilos() {
    this.estilo = this.estilos_service.consultar_estilo_producto(this.tipo_producto);
  }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper1") as HTMLElement, {
      linear: false,
      animation: true
    })
  }

  private construir_form() {
    this.sub_form_creado = false;

    let sub_form: FormGroup = {} as FormGroup;
    let producto = this.producto_form.get("producto") as FormGroup

    switch (this.tipo_producto) {
      case 1:
        sub_form = this.fb.group({
          id_tipo: this.tipo_producto,
          artista: this.fb.array([this.fb.control('', Validators.required)]),
          generos: this.fb.array([]),
        })
        break;
      case 2:
        sub_form = this.fb.group({
          id_tipo: this.tipo_producto,
          tipo: this.fb.array([this.fb.control('', Validators.required)]),
          conexion: this.fb.array([]),
          marca: this.fb.array([this.fb.control('', Validators.required)]),
        })
        break;
      case 3:
        sub_form = this.fb.group({
          id_tipo: this.tipo_producto,
          tipo: this.fb.array([]),
          conexion: this.fb.array([]),
          marca: this.fb.array([this.fb.control('', Validators.required)]),
        })
        break;
    }
    producto.removeControl('caracteristicas');
    producto.addControl('caracteristicas', sub_form);
    this.sub_form_creado = true;
  }

  crear_producto() {
    let producto_info = this.producto_form.getRawValue();

    this.submitted = true;
    this.cargando = true;

    if (this.producto_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.productos_service.crear_un_producto(producto_info).subscribe((res: any) => {
      this.toastr.clear();
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando = false;
      } else {
        this.toastr.success(res.body.resultado, 'Se creó el producto', { timeOut: 2000 });
        this.cargando = false;
        this.router.navigate(['/inicio/productos'])
      }
    });

    this.submitted = false;
  }

}
