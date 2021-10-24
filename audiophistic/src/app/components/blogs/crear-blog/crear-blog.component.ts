import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-crear-blog',
  templateUrl: './crear-blog.component.html',
  styleUrls: ['./crear-blog.component.css']
})



export class CrearBlogComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  blog_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;
  modificar: boolean = false;

  private stepper: Stepper = {} as Stepper;
  tipo_producto: number = 1;
  estilo: string = '';

  constructor(private toastr: ToastrService, private fb: FormBuilder, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/blogs'])
        }
      });
    this.blog_form = this.fb.group({
      titulo: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      contenido: ['', [Validators.required]],
      etiquetas: this.fb.array([]),
    });
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

  get form() { return this.blog_form.controls }

  get etiquetas(): FormArray {
    return this.blog_form.get('etiquetas') as FormArray
  }

  nueva_etiqueta(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregar_etiqueta() {
    this.etiquetas.push(this.nueva_etiqueta());
  }

  eliminar_etiqueta(i: number) {
    this.etiquetas.removeAt(i);
  }


  crear_blog() {
    let blog_info = this.blog_form.getRawValue();

    this.enviado = true;
    this.cargando = true;

    for (let estilo of (this.blog_form.get('estilos') as FormArray).controls) {
      if (this.duplicado(estilo.value.nombre)) {
        this.toastr.error('Los estilos no pueden tener nombres iguales', 'Error', { timeOut: 5000 });
        this.cargando = false;
        return;
      }
    }
    if (this.blog_form.invalid) {
      this.toastr.error('Por favor revise que haya completado todos los campos obligatorios', 'Error', { timeOut: 5000 });
      this.cargando = false;
      return;
    }

    this.enviado = false;
  }

  duplicado(nombre: any): boolean {
    let array_estilos = this.blog_form.get('estilos') as FormArray

    let duplicados = array_estilos.controls.filter((data: any) =>
      data.controls.nombre.value == nombre && nombre != null)

    if (duplicados.length > 1) {
      return true;
    } else {
      return false
    }
  }

}
