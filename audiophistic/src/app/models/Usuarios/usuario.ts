import { Tipo_Usuario } from "./tipo_usuario";
import { Usuario_Consumidor } from "./usuario_consumidor";

export interface Usuario {
    correo: string,
    id_usuario: number,
    nombre: string,
    caracteristicas: Usuario_Consumidor;
}