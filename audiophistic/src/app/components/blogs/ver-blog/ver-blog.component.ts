import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { enlace_global } from 'src/app/models/global';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { CompartirComponent } from '../../modals/compartir/compartir.component';

@Component({
  selector: 'app-ver-blog',
  templateUrl: './ver-blog.component.html',
  styleUrls: ['./ver-blog.component.css'],
  providers: [NgbRatingConfig]
})
export class VerBlogComponent implements OnInit {

  calificacion_actual = 1;
  blog: any = {}
  slides: number[] = []

  constructor(private ruta_activated: ActivatedRoute,
    config: NgbRatingConfig,
    private blogs_service: BlogsService,
    private toastr: ToastrService,
    private router: Router,
    private modal_service: NgbModal) {
    this.ruta_activated.params.subscribe(params => {
      this.blogs_service.consultar_un_blog(params['id']).subscribe((res: any) => {
        if (res.body.error) {
          this.toastr.error(res.body.error, 'Error', { timeOut: 5000 });
        } else {
          this.blog = res.body.resultado;
          this.slides_carrusel();
        }
      })
    })
    config.max = 5;
  }

  ver_creador(id_usuario: any) {
    this.router.navigate(['/ver-usuario-creador-contenido', id_usuario]);
  }


  ngOnInit(): void {
  }

  abrir_modal_compartir() {
    const modal_ref = this.modal_service.open(CompartirComponent,
      {
        scrollable: true,
        windowClass: 'custom_modal',
      });

    let datos = {
      compartir: 'blog',
      enlace: enlace_global + this.blog.enlace
    }

    modal_ref.componentInstance.datos_compartir = datos;
    modal_ref.result.then((result) => {
    }, (reason) => {
    });
  }

  slides_carrusel() {
    /* Create 3 columns for carousel */
    let slide = Math.ceil(this.blog.productos.length / 2);
    var mult = 0;
    for (var i = 0; i < slide; i += 1) {
      this.slides.push(mult);
      mult += 2;
    }
  }

}
