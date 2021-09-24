import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {

  categoria_form: FormGroup = {} as FormGroup;
  enviado: boolean = false;
  cargando: boolean = false;

  private stepper: Stepper = {} as Stepper;


  constructor(private fb: FormBuilder,private toastr: ToastrService, private router: Router) {
    this.router.events
      .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
      .subscribe(evento => {
        if (evento.id === 1 && evento.url === evento.urlAfterRedirects) {
          this.router.navigate(['/inicio/categorias'])
        }
      });

    this.categoria_form = this.fb.group({
      nombre: ['', [Validators.required]]
    });
  }

  get form() { return this.categoria_form.controls }

  anterior() {
    this.stepper.previous();
  }

  siguiente() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.stepper = new Stepper(document.getElementById("stepper_categoria") as HTMLElement, {
      linear: false,
      animation: true,
      selectors: {
        steps: '.step',
        trigger: '.step-trigger',
        stepper: '.bs-stepper'
      }
    });
  }

}
