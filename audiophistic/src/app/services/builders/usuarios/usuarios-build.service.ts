import { Injectable } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario_Administrador } from 'src/app/models/Usuarios/usuario_administrador';
import { Usuario_Consumidor } from 'src/app/models/Usuarios/usuario_consumidor';
import { Usuario_Creador_de_Contenido } from 'src/app/models/Usuarios/usuario_creador_contenido';

@Injectable({
  providedIn: 'root'
})
export class UsuariosBuilderService {

  constructor(private fb: FormBuilder) { }

  construir_form_usuario(rol: string, usuario_obj: any): FormGroup {
    let sub_form: FormGroup = {} as FormGroup;
    let usuario: UsuariosBuilder;

    switch (rol) {
      case '1':
        usuario = new UsuariosAdministradorBuilder(this.fb);
        sub_form = usuario.construir_form_usuario(usuario_obj, sub_form, this.fb)
        break;
      case '2':
        usuario = new UsuariosCreadorContenidoBuilder(this.fb);
        sub_form = usuario.construir_form_usuario(usuario_obj, sub_form, this.fb)
        break;
      case '3':
        usuario = new UsuariosConsumidorBuilder(this.fb);
        sub_form = usuario.construir_form_usuario(usuario_obj, sub_form, this.fb)
        break;
      default:
        break;
    }

    return sub_form
  }
}

abstract class UsuariosBuilder {
  constructor(private fb: FormBuilder) { }

  construir_form_usuario(usuario_obj: any, sub_form: FormGroup, fb: FormBuilder): FormGroup {
    return this.construir_form_usuario(usuario_obj, sub_form, fb)
  }

}

export class UsuariosConsumidorBuilder extends UsuariosBuilder {

  construir_form_usuario(usuario_obj: any, sub_form: FormGroup, fb: FormBuilder): FormGroup {
    usuario_obj = usuario_obj as Usuario_Consumidor
    sub_form = fb.group({
      celular: [usuario_obj.caracteristicas.celular || ''],
      provincia: [usuario_obj.caracteristicas.provincia || '1', [Validators.required]],
      canton: [usuario_obj.caracteristicas.canton || '1', [Validators.required]],
      direccion_exacta: [usuario_obj.caracteristicas.direccion_exacta || ''],
      cumpleanos: [usuario_obj.caracteristicas.cumpleanos || '']
    })
    return sub_form;
  }
}
export class UsuariosCreadorContenidoBuilder extends UsuariosBuilder {

  construir_form_usuario(usuario_obj: any, sub_form: FormGroup, fb: FormBuilder): FormGroup {
    usuario_obj = usuario_obj as Usuario_Creador_de_Contenido
    sub_form = fb.group({
      imagen: [usuario_obj.caracteristicas.imagen || ''],
      imagen_entrada: [''],
      celular: [usuario_obj.caracteristicas.celular || ''],
      descripcion: [usuario_obj.caracteristicas.descripcion, [Validators.required]],
      sitio_web: [usuario_obj.caracteristicas.sitio_web || ''],
      provincia: [usuario_obj.caracteristicas.provincia, [Validators.required]],
      canton: [usuario_obj.caracteristicas.canton, [Validators.required]],
      direccion_exacta: [usuario_obj.caracteristicas.direccion_exacta || '']
    })
    return sub_form;
  }
}

export class UsuariosAdministradorBuilder extends UsuariosBuilder {

  construir_form_usuario(usuario_obj: any, sub_form: FormGroup, fb: FormBuilder): FormGroup {
    usuario_obj = usuario_obj as Usuario_Administrador
    sub_form = fb.group({
      celular: [usuario_obj.caracteristicas.celular || '']
    })
    return sub_form;
  }
}
