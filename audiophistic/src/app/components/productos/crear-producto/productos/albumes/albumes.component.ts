import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstilosService } from 'src/app/services/estilos/estilos.service';

@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css', '../../crear-producto.component.css']
})
export class AlbumesComponent implements OnInit {

  @Input() submitted: boolean = false;
  @Input() sub_form_creado: boolean = false;

  precio: string = ''

  albumes_form: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer,
     private estilos_service: EstilosService) { }

  ngOnInit(): void {
    this.albumes_form = (<FormGroup>this.controlContainer.control).get('producto') as FormGroup;
    console.log(this.form)
  }

  get form() { return this.albumes_form.controls }

  get form_caracteristicas() { return (this.albumes_form.get('caracteristicas') as FormGroup).controls }

  transformar_dinero(elemento: any) {
    this.precio = this.estilos_service.transformar_dinero(elemento)
  }

  get artista(): FormArray {
    return (this.albumes_form.get('caracteristicas') as FormGroup).get('artista') as FormArray
  }

  get generos(): FormArray {
    return (this.albumes_form.get('caracteristicas') as FormGroup).get('generos') as FormArray
  }

  nueva_caracteristica(): FormControl {
    return this.fb.control('', Validators.required);
  }

  agregar_genero() {
    this.generos.push(this.nueva_caracteristica());
  }

  eliminar_genero(i: number) {
    this.generos.removeAt(i);
  }

}
