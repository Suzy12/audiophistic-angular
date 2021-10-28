import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ComentariosCalificacionesService } from 'src/app/services/comentarios_calificaciones/comentarios-calificaciones.service';

@Component({
  selector: 'app-editar-comentario-blog',
  templateUrl: './editar-comentario-blog.component.html',
  styleUrls: ['../compartir.css', './editar-comentario-blog.component.css']
})
export class EditarComentarioBlogComponent implements OnInit {

  @Input() datos_comentario: any;
  cargando: boolean = false;

  constructor(
    public activo_modal: NgbActiveModal,
    private toastr: ToastrService,
    private comentarios_calificaciones_service: ComentariosCalificacionesService
  ) {
  }

  ngOnInit() {
  }

  cerrar_modal(mensaje: string) {
    this.activo_modal.close(mensaje);
  }

  editar_comentario() {
    this.cargando = true;
    let comentario_info = {
      id_comentario: this.datos_comentario.id, 
      id_origen: this.datos_comentario.id_blog, 
      comentario: this.datos_comentario.mensaje 

    }
    this.comentarios_calificaciones_service.modificar_comentario_blog(comentario_info).subscribe(
      (res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.toastr.success(res.body.resultado, 'Éxito', { timeOut: 5000 });
          this.cargando = false;
          this.cerrar_modal(this.datos_comentario.mensaje)
        }
      }, (error) => {
        this.toastr.error("Hubo un error al conectarse al sistema", 'Error', { timeOut: 5000 });
      }
    );
  }
}
