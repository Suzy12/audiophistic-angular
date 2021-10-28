import { ResourceLoader } from '@angular/compiler';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { cantidad_a_traer_global } from 'src/app/models/global';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';
import { EditarComentarioBlogComponent } from '../../modals/editar-comentario-blog/editar-comentario-blog.component';
import { EliminarModalComponent } from '../../modals/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id_blog: number = 0;
  comentario: string = '';
  cargando: boolean = false;
  cargando_comentarios: boolean = false;

  cantidad_a_traer: number = cantidad_a_traer_global;
  pagina: number = -(cantidad_a_traer_global - 1);
  comentarios: any[] = [];
  cargar_mas: boolean = true;

  constructor(private modal_service: NgbModal,
    private comentarios_calificaciones_service: ComentariosCalificacionesService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    changes.id_blog.currentValue != undefined ? this.consultar_comentarios_blog() : null;
  }


  abrir_modal_eliminar(id_comentario: number) {
    const modal_ref = this.modal_service.open(EliminarModalComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      eliminar: 'comentario',
      mensaje: "¿Está seguro que desea eliminar este comentario?",
      id: id_comentario,
      id_blog: this.id_blog
    }

    modal_ref.componentInstance.datos_eliminar = datos;
    modal_ref.result.then((result) => {
      if(result != 'cancelar'){window.location.reload()}
    }, (reason) => {
    });
  }

  abrir_modal_comentario(comentario:string, id_comentario:number) {
    const modal_ref = this.modal_service.open(EditarComentarioBlogComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      editar: 'comentario',
      mensaje: comentario,
      id: id_comentario,
      id_blog: this.id_blog
    }

    modal_ref.componentInstance.datos_comentario = datos;
    modal_ref.result.then((result) => {
      if(result != 'cancelar'){
        let modificar = this.comentarios.find((item:any) => id_comentario == item.id_comentario)
        modificar.comentario = result
        console.log(modificar)
      }
    }, (reason) => {
    });
  }

  consultar_comentarios_blog() {
    this.cargando_comentarios = true;

    this.comentarios_calificaciones_service.consultar_comentarios_blog(
      this.id_blog,
      this.cantidad_a_traer,
      this.pagina + this.cantidad_a_traer
    ).subscribe((res: any) => {

      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando_comentarios = false;
      } else {
        this.pagina += this.cantidad_a_traer;
        this.comentarios = this.comentarios.concat(res.body.resultado.comentarios)
        res.body.resultado.comentarios.length < this.cantidad_a_traer ? this.cargar_mas = false : this.cargar_mas = true;
        this.cargando_comentarios = false;
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      this.cargando_comentarios = false;
    })
  }

  comentar_blog() {
    this.cargando = true;

    let comentario_info = {
      id_origen: this.id_blog,
      comentario: this.comentario
    }
    this.comentarios_calificaciones_service.crear_comentario_blog(comentario_info).subscribe((res: any) => {
      if (res.body.error) {
        this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        this.cargando = false;
      } else {
        this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
        this.cargando = false;
        window.location.reload();
      }
    }, (error) => {
      this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      this.cargando = false;
    })
  }

}
