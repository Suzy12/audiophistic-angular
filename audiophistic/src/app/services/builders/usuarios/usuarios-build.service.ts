import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario_Administrador } from 'src/app/models/Usuarios/usuario_administrador';
import { Usuario_Consumidor } from 'src/app/models/Usuarios/usuario_consumidor';
import { Usuario_Creador_de_Contenido } from 'src/app/models/Usuarios/usuario_creador_contenido';

@Injectable({
  providedIn: 'root'
})
export class UsuariosBuildService {

  constructor(private fb: FormBuilder) { }

  construir_form_usuario(rol: string, usuario_obj: any): FormGroup {
    let sub_form: FormGroup = {} as FormGroup;

    switch (rol) {
      case '1':
        usuario_obj = usuario_obj as Usuario_Administrador
        sub_form = this.fb.group({
          celular: [usuario_obj.caracteristicas.celular || '']
        })
        break;
      case '2':
        usuario_obj = usuario_obj as Usuario_Creador_de_Contenido
        sub_form = this.fb.group({
          imagen: [usuario_obj.caracteristicas.imagen || ''],
          imagen_entrada: [''],
          celular: [usuario_obj.caracteristicas.celular || ''],
          descripcion: [usuario_obj.caracteristicas.descripcion, [Validators.required]],
          sitio_web: [usuario_obj.caracteristicas.sitio_web || ''],
          provincia: [usuario_obj.caracteristicas.provincia, [Validators.required]],
          canton: [usuario_obj.caracteristicas.canton, [Validators.required]],
          direccion_exacta: [usuario_obj.caracteristicas.direccion_exacta || '']
        })
        break;
      case '3':
        usuario_obj = usuario_obj as Usuario_Consumidor
        sub_form = this.fb.group({
          celular: [usuario_obj.caracteristicas.celular || ''],
          provincia: [usuario_obj.caracteristicas.provincia || '1', [Validators.required]],
          canton: [usuario_obj.caracteristicas.canton || '1', [Validators.required]],
          direccion_exacta: [usuario_obj.caracteristicas.direccion_exacta || ''],
          cumpleanos: [usuario_obj.caracteristicas.cumpleanos || '']
        })
        break;
      default:
        break;
    }

    return sub_form
  }
}
