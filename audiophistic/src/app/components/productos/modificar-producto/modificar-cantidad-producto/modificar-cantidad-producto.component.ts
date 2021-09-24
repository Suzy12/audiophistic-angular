import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { EstilosService } from 'src/app/services/estilos/estilos.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-modificar-cantidad-producto',
  templateUrl: './modificar-cantidad-producto.component.html',
  styleUrls: ['../../../../../animaciones.css', './modificar-cantidad-producto.component.css']
})
export class ModificarCantidadProductoComponent implements OnInit {

  producto_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;
  form_creado: boolean = false;

  id_producto: number = 0;
  tipo_producto: number = 1;


  constructor(private estilos_service: EstilosService, private productos_service: ProductosService,
    private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/productos'])
        }
      });
    if (this.router.getCurrentNavigation()!.extras.state) {
      this.id_producto = this.router.getCurrentNavigation()!.extras.state!.id;
      this.producto_form = this.fb.group({
        estilos: this.fb.array([])
      });
      this.crear_form_con_valores()
    }
  }

  crear_form_con_valores() {
    this.form_creado = false;
    this.productos_service.consultar_un_producto(this.id_producto).subscribe((res: any) => {
      let producto = res.body.resultado;
      this.tipo_producto = producto.caracteristicas.id_tipo;

      this.productos_service.consultar_estilos_producto(this.id_producto).subscribe((res: any) => {
        let estilos = res.body.resultado

        let estilos_final: any = []
        estilos.forEach((estilo: any) => {
          estilos_final.push(this.estilos_service.crear_estilo_form_modificar(estilo, false))
        });
        this.producto_form.setControl('estilos', this.fb.array(estilos_final || []));
      })
    })
    this.form_creado = true;
  }

  ngOnInit(): void {
  }

  get estilos(): FormArray { return this.producto_form.get('estilos') as FormArray }

}
